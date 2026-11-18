import { BagIcon } from "./ShopIcons.jsx";
import { formatMoney } from "../utils/cart.js";

export default function CartDock({ count, total, onOpenCart }) {
  if (!count) return null;
  return <div className="cart-dock"><button type="button" onClick={onOpenCart}>
    <span className="cart-dock-label"><BagIcon size={21}/><span>Ver carrinho <small>{count} {count === 1 ? "item" : "itens"}</small></span></span>
    <strong>{formatMoney(total)}</strong>
  </button></div>;
}
