import test from "node:test";
import assert from "node:assert/strict";
import { products } from "../src/data/menu.js";
import { normalizeSearch, searchProducts } from "../src/utils/search.js";

test("busca ignora maiúsculas e acentos", () => {
  assert.equal(normalizeSearch("  HAMBÚRGUER  Artesanal "), "hamburguer artesanal");
});

test("busca pelo nome ou descrição", () => {
  const result = searchProducts(products, "todos", "bacon");
  assert.deepEqual(result.map((p) => p.id), ["bacon-house"]);
});

test("busca combinada respeita categoria", () => {
  assert.deepEqual(searchProducts(products, "frango", "cheddar"), []);
  assert.deepEqual(searchProducts(products, "frango", "maionese").map((p) => p.id), ["crispy-chicken"]);
});

test("busca sem texto preserva os produtos da categoria", () => {
  assert.equal(searchProducts(products, "todos", " ").length, products.length);
  assert.equal(searchProducts(products, "hamburgueres", " ").length, 3);
});

test("busca com termos separados corresponde à descrição", () => {
  assert.deepEqual(searchProducts(products, "todos", "molho casa").map((p) => p.id), ["brasa-double"]);
});
