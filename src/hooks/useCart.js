import { useEffect, useState } from "react";
import { addOrReplaceLine, changeLineQuantity, normalizeCart } from "../utils/cart.js";

const STORAGE_KEY = "brasa-demo-cart-v1";
function readSavedCart() {
  try {
    return normalizeCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState(readSavedCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // O carrinho continua funcionando em memória se o armazenamento estiver bloqueado.
    }
  }, [cart]);

  return {
    cart,
    addLine: (config, editingKey = null) => setCart((current) => addOrReplaceLine(current, config, editingKey)),
    increment: (key) => setCart((current) => changeLineQuantity(current, key, 1)),
    decrement: (key) => setCart((current) => changeLineQuantity(current, key, -1)),
    removeLine: (key) => setCart((current) => current.filter((line) => line.key !== key)),
  };
}
