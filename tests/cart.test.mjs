import test from "node:test";
import assert from "node:assert/strict";
import { addOrReplaceLine, changeLineQuantity, formatMoney, makeLine, normalizeCart, totalCents } from "../src/utils/cart.js";

test("valor usa centavos: base + adicional", () => {
  const line = makeLine({ productId: "classic-smash", addonIds: ["cheddar-extra"], quantity: 2 });
  assert.equal(totalCents([line]), 7480);
  assert.equal(formatMoney(totalCents([line])), "R$ 74,80");
});
test("duas configurações diferentes continuam separadas", () => {
  let cart = addOrReplaceLine([], { productId: "classic-smash" });
  cart = addOrReplaceLine(cart, { productId: "classic-smash", addonIds: ["bacon-extra"] });
  assert.equal(cart.length, 2);
});
test("configurações iguais se agrupam", () => {
  let cart = addOrReplaceLine([], { productId: "classic-smash" });
  cart = addOrReplaceLine(cart, { productId: "classic-smash", quantity: 2 });
  assert.equal(cart[0].quantity, 3);
});
test("editar substitui a versão anterior do produto", () => {
  const cart = addOrReplaceLine([], { productId: "classic-smash" });
  const edited = addOrReplaceLine(cart, { productId: "classic-smash", addonIds: ["ovo"] }, cart[0].key);
  assert.equal(edited.length, 1);
  assert.deepEqual(edited[0].addonIds, ["ovo"]);
});
test("produtos desconhecidos não entram no carrinho", () => {
  assert.equal(makeLine({ productId: "fake" }), null);
  assert.equal(normalizeCart([{ productId: "fake" }]).length, 0);
});
test("ids inválidos são ignorados sem alterar o preço", () => {
  const line = makeLine({ productId: "classic-smash", addonIds: ["fake", "cheddar-extra", "cheddar-extra"], removedIngredientIds: ["fake"] });
  assert.deepEqual(line.addonIds, ["cheddar-extra"]);
  assert.equal(totalCents([line]), 3740);
});
test("quantidade é limitada entre 1 e 30", () => {
  const line = makeLine({ productId: "classic-smash" });
  assert.equal(changeLineQuantity([line], line.key, -1)[0].quantity, 1);
  assert.equal(changeLineQuantity([line], line.key, 100)[0].quantity, 30);
});
test("itens do armazenamento são normalizados", () => {
  assert.deepEqual(normalizeCart({ invalid: true }), []);
  const cart = normalizeCart([{ productId: "classic-smash", quantity: 1 }, { productId: "classic-smash", quantity: 2 }, { productId: "fake" }]);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);
});
