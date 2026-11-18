import test from "node:test";
import assert from "node:assert/strict";
import { makeLine } from "../src/utils/cart.js";
import { buildOrderMessage, validateCheckout } from "../src/utils/checkout.js";

const cart = [makeLine({ productId: "classic-smash", quantity: 2, addonIds: ["bacon-extra"], removedIngredientIds: ["picles"] })];
const pickup = { name: "Ana", fulfillment: "retirada", notes: "Sem guardanapo" };
const delivery = {
  name: "Ana", fulfillment: "entrega", street: "Rua Exemplo", number: "12",
  neighborhood: "Centro", city: "Jundiaí", complement: "Apto 2", notes: "",
};

test("aceita retirada com nome e carrinho", () => {
  assert.equal(validateCheckout(cart, pickup), null);
});
test("rejeita carrinho vazio", () => {
  assert.equal(validateCheckout([], pickup), "Seu carrinho está vazio.");
});
test("rejeita nome em branco", () => {
  assert.equal(validateCheckout(cart, { ...pickup, name: "   " }), "Informe seu nome para continuar.");
});
test("endereço é obrigatório apenas na entrega", () => {
  assert.equal(validateCheckout(cart, { ...delivery, street: "" }), "Informe a rua ou avenida.");
  assert.equal(validateCheckout(cart, { ...pickup, street: "" }), null);
});
test("valida número, bairro e cidade para entrega", () => {
  assert.match(validateCheckout(cart, { ...delivery, number: "" }), /número/);
  assert.match(validateCheckout(cart, { ...delivery, neighborhood: "" }), /bairro/);
  assert.match(validateCheckout(cart, { ...delivery, city: "" }), /cidade/);
});
test("mensagem inclui adicionais, remoções, quantidades e subtotal", () => {
  const message = buildOrderMessage(cart, pickup);
  assert.match(message, /2x Classic Smash/);
  assert.match(message, /Bacon crocante/);
  assert.match(message, /Sem: Picles/);
  assert.match(message, /R\$\s77,80/);
  assert.match(message, /Sem guardanapo/);
});
test("mensagem de entrega indica taxa e total não confirmados", () => {
  const message = buildOrderMessage(cart, delivery);
  assert.match(message, /Rua Exemplo, 12/);
  assert.match(message, /Jundiaí/);
  assert.match(message, /Taxa de entrega:\* a confirmar/);
  assert.match(message, /Total com entrega:\* a confirmar/);
});
