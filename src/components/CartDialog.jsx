import { forwardRef, useImperativeHandle, useRef } from "react";
import { formatMoney, getLineAdjustments, getProduct, totalCents, unitPriceCents } from "../utils/cart.js";
import { BagIcon, CloseIcon } from "./ShopIcons.jsx";

const CartDialog = forwardRef(function CartDialog({ cart, increment, decrement, removeLine, onEdit, onCheckout }, ref) {
  const dialogRef = useRef(null);
  useImperativeHandle(ref, () => ({
    open: () => { if (!dialogRef.current?.open) dialogRef.current?.showModal(); },
  }));

  function edit(line) {
    dialogRef.current?.close();
    onEdit(line);
  }

  function checkout() {
    dialogRef.current?.close();
    onCheckout();
  }

  return <dialog ref={dialogRef} className="shop-dialog cart-dialog" aria-labelledby="cart-title">
    <div className="cart-heading">
      <div><p className="shop-eyebrow">SEU PEDIDO</p><h2 id="cart-title">Meu carrinho</h2></div>
      <button className="shop-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar carrinho"><CloseIcon /></button>
    </div>
    <div className="cart-scroll">
      {cart.length === 0 ? <div className="cart-empty"><BagIcon size={38}/><h3>Seu carrinho está vazio.</h3><p>O próximo favorito está a um clique de distância.</p><button type="button" className="shop-primary" onClick={() => dialogRef.current?.close()}>Explorar cardápio</button></div>
        : cart.map((line) => {
          const product = getProduct(line.productId);
          if (!product) return null;
          const { extras, removals } = getLineAdjustments(line);
          return <article className="cart-item" key={line.key}>
            <img src={product.image} alt="" width="112" height="112" loading="lazy" />
            <div className="cart-item-main">
              <div className="cart-item-top"><h3>{product.name}</h3><strong>{formatMoney(unitPriceCents(line) * line.quantity)}</strong></div>
              {extras.length > 0 && <p>+ {extras.join(", ")}</p>}
              {removals.length > 0 && <p>Sem {removals.join(", ")}</p>}
              <div className="cart-item-bottom"><button type="button" className="cart-edit" onClick={() => edit(line)}>Editar</button>
                <button type="button" className="cart-remove" onClick={() => removeLine(line.key)}>Remover</button>
                <div className="quantity-control quantity-small"><button type="button" aria-label={`Diminuir quantidade de ${product.name}`} onClick={() => decrement(line.key)} disabled={line.quantity <= 1}>−</button><span>{line.quantity}</span><button type="button" aria-label={`Aumentar quantidade de ${product.name}`} onClick={() => increment(line.key)} disabled={line.quantity >= 30}>+</button></div>
              </div>
            </div>
          </article>;
        })}
    </div>
    {cart.length > 0 && <div className="cart-footer">
      <div className="cart-subtotal"><span>Subtotal</span><strong>{formatMoney(totalCents(cart))}</strong></div>
      <p>O pedido será preparado para WhatsApp. Taxas e disponibilidade são confirmadas pelo restaurante.</p>
      <button type="button" className="shop-primary cart-continue" onClick={checkout}>Finalizar pedido <span aria-hidden="true">↗</span></button>
    </div>}
  </dialog>;
});
export default CartDialog;
