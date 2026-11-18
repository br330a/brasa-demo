import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { products } from "../src/data/menu.js";
import { getLineAdjustments, makeLine, totalCents } from "../src/utils/cart.js";
import { buildOrderMessage } from "../src/utils/checkout.js";

test("Fritas BRASA permitem remover cheddar e bacon", () => {
  const line = makeLine({ productId: "fritas-brasa", removedIngredientIds: ["bacon", "cheddar"] });
  assert.deepEqual(line.removedIngredientIds, ["bacon", "cheddar"]);
  assert.equal(totalCents([line]), 2890);
});

test("remover itens da receita não gera desconto automático", () => {
  const normal = makeLine({ productId: "fritas-brasa" });
  const semBacon = makeLine({ productId: "fritas-brasa", removedIngredientIds: ["bacon"] });
  assert.notEqual(normal.key, semBacon.key);
  assert.equal(totalCents([normal]), totalCents([semBacon]));
});

test("resumo e mensagem usam os nomes corretos das personalizações", () => {
  const line = makeLine({ productId: "fritas-brasa", addonIds: ["molho-extra"], removedIngredientIds: ["bacon", "cheddar"] });
  assert.deepEqual(getLineAdjustments(line), {
    extras: ["Molho da casa"], removals: ["Bacon", "Cheddar"],
  });
  const text = buildOrderMessage([line], { fulfillment: "retirada", name: "Ana" });
  assert.match(text, /Fritas BRASA/);
  assert.match(text, /Sem: Bacon, Cheddar/);
  assert.match(text, /Molho da casa/);
});

test("itens sem personalização não recebem ajustes no resumo", () => {
  assert.deepEqual(getLineAdjustments(makeLine({ productId: "guarana-lata" })), { extras: [], removals: [] });
});

test("os cartões têm imagens leves locais e cada produto mantém a imagem original", () => {
  for (const product of products) {
    const original = new URL(`../public${product.image}`, import.meta.url);
    const thumb = new URL(`../public${product.image.replace(/\.webp$/, "-card.webp")}`, import.meta.url);
    assert.ok(existsSync(original), `original ausente: ${product.id}`);
    assert.ok(existsSync(thumb), `miniatura ausente: ${product.id}`);
  }
});
