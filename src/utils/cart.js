import { addOns, products } from "../data/menu.js";

export const formatMoney = (cents) => new Intl.NumberFormat("pt-BR", {
  style: "currency", currency: "BRL",
}).format(cents / 100);

const quantityWithin = (amount) => Number.isInteger(amount) && amount >= 1 && amount <= 30;
const uniqueSorted = (values) => [...new Set(values)].sort();

export function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function makeLine({ productId, quantity = 1, addonIds = [], removedIngredientIds = [] }) {
  const product = getProduct(productId);
  if (!product || !quantityWithin(quantity)) return null;
  const validAddOns = new Set(addOns.map((addon) => addon.id));
  const validIngredients = new Set(product.ingredients.map((ingredient) => ingredient.id));
  if (!Array.isArray(addonIds) || !Array.isArray(removedIngredientIds)) return null;
  const additions = uniqueSorted(addonIds.filter((id) => typeof id === "string" && validAddOns.has(id)));
  const removals = uniqueSorted(removedIngredientIds.filter((id) => typeof id === "string" && validIngredients.has(id)));
  const key = JSON.stringify([productId, additions, removals]);
  return { key, productId, addonIds: additions, removedIngredientIds: removals, quantity };
}

export function unitPriceCents(line) {
  const product = getProduct(line.productId);
  if (!product) return 0;
  const extraCents = line.addonIds.reduce((sum, id) => {
    const addon = addOns.find((item) => item.id === id);
    return sum + (addon ? Math.round(addon.price * 100) : 0);
  }, 0);
  return Math.round(product.price * 100) + extraCents;
}

export function totalCents(lines) {
  return lines.reduce((sum, line) => sum + unitPriceCents(line) * line.quantity, 0);
}

export function itemCount(lines) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function normalizeCart(value) {
  if (!Array.isArray(value)) return [];
  const result = [];
  for (const raw of value.slice(0, 100)) {
    if (!raw || typeof raw !== "object") continue;
    const line = makeLine(raw);
    if (!line) continue;
    const existing = result.find((item) => item.key === line.key);
    if (existing) existing.quantity = Math.min(30, existing.quantity + line.quantity);
    else result.push(line);
  }
  return result;
}

export function addOrReplaceLine(cart, config, editingKey = null) {
  const line = makeLine(config);
  if (!line) return cart;
  const result = editingKey === null ? [...cart] : cart.filter((item) => item.key !== editingKey);
  const existing = result.find((item) => item.key === line.key);
  if (existing) return result.map((item) => item.key === line.key
    ? { ...item, quantity: Math.min(30, item.quantity + line.quantity) }
    : item);
  return [...result, line];
}

export function changeLineQuantity(cart, key, amount) {
  return cart.map((item) => item.key === key
    ? { ...item, quantity: Math.max(1, Math.min(30, item.quantity + amount)) }
    : item);
}
