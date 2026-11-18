import test from "node:test";
import assert from "node:assert/strict";
import { categories, products, addOns } from "../src/data/menu.js";
import { makeLine, totalCents } from "../src/utils/cart.js";
import { searchProducts } from "../src/utils/search.js";
import { buildOrderMessage } from "../src/utils/checkout.js";

test("cardápio completo tem categorias, preços e imagens válidos", () => {
  assert.equal(products.length, 17);
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  for (const category of categories.filter((c) => c.id !== "todos")) {
    assert.ok(products.some((p) => p.category === category.id));
  }
  for (const product of products) {
    assert.ok(product.price > 0);
    assert.ok(product.image.startsWith("/images/") && product.image.endsWith(".webp"));
    assert.ok(Array.isArray(product.ingredients) && Array.isArray(product.addOnIds));
    for (const id of product.addOnIds) {
      assert.ok(addOns.some((addon) => addon.id === id));
    }
  }
});

test("bebidas não aceitam adicional salgado mesmo se for enviado manualmente", () => {
  const line = makeLine({ productId: "cola-gelada", addonIds: ["bacon-extra", "cheddar-extra"] });
  assert.deepEqual(line.addonIds, []);
  assert.equal(totalCents([line]), 890);
});

test("adicionais das sobremesas são permitidos e calculados", () => {
  const line = makeLine({ productId: "brownie-brasa", addonIds: ["sorvete-extra", "cheddar-extra"] });
  assert.deepEqual(line.addonIds, ["sorvete-extra"]);
  assert.equal(totalCents([line]), 3090);
});

test("vegetariano não permite bacon como adicional", () => {
  const line = makeLine({ productId: "veggie-crispy", addonIds: ["cheddar-extra", "bacon-extra"] });
  assert.deepEqual(line.addonIds, ["cheddar-extra"]);
});

test("busca filtra bebidas e sobremesas com texto normalizado", () => {
  assert.deepEqual(searchProducts(products, "bebidas", "limonada").map((p) => p.id), ["limonada-casa"]);
  assert.deepEqual(searchProducts(products, "sobremesas", "brownie").map((p) => p.id), ["brownie-brasa"]);
  assert.deepEqual(searchProducts(products, "hamburgueres", "limonada"), []);
});

test("pedido combina salgado, bebida e sobremesa com subtotal correto", () => {
  const cart = [
    makeLine({ productId: "brasa-bbq" }),
    makeLine({ productId: "limonada-casa", quantity: 2 }),
    makeLine({ productId: "brownie-brasa" }),
  ];
  assert.equal(totalCents(cart), 9560);
  const message = buildOrderMessage(cart, { name: "Teste", fulfillment: "retirada" });
  assert.match(message, /Brasa BBQ/);
  assert.match(message, /2x Limonada da Casa/);
  assert.match(message, /Brownie da BRASA/);
  assert.match(message, /R\$\s95,60/);
});
