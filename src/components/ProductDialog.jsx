import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { addOns } from "../data/menu.js";
import { formatMoney, makeLine, unitPriceCents } from "../utils/cart.js";
import { CloseIcon } from "./ShopIcons.jsx";

const ProductDialog = forwardRef(function ProductDialog({ onAdd }, ref) {
  const dialogRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addonIds, setAddonIds] = useState([]);
  const [removedIngredientIds, setRemovedIngredientIds] = useState([]);

  function open(nextProduct, currentLine = null) {
    if (!nextProduct) return;
    setProduct(nextProduct);
    setEditingKey(currentLine?.key ?? null);
    setQuantity(currentLine?.quantity ?? 1);
    setAddonIds(currentLine?.addonIds ?? []);
    setRemovedIngredientIds(currentLine?.removedIngredientIds ?? []);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }
  useImperativeHandle(ref, () => ({ open }));

  function toggle(id, values, setter) {
    setter(values.includes(id) ? values.filter((value) => value !== id) : [...values, id]);
  }

  const draft = product && makeLine({ productId: product.id, quantity, addonIds, removedIngredientIds });
  const unit = draft ? unitPriceCents(draft) : 0;

  function submit() {
    if (!draft) return;
    onAdd(draft, editingKey);
    dialogRef.current?.close();
  }

  return (
    <dialog ref={dialogRef} className="shop-dialog product-dialog" aria-labelledby="product-dialog-title">
      {product && <div className="shop-dialog-body product-layout">
        <div className="product-hero-image">
          <img src={product.image} alt={product.imageAlt} width="768" height="512" />
          <button type="button" className="shop-close product-close" onClick={() => dialogRef.current?.close()} aria-label="Fechar detalhes"><CloseIcon /></button>
        </div>
        <div className="product-options">
          <div className="product-option-heading">
            <p className="shop-eyebrow">PREPARADO DO SEU JEITO</p>
            <h2 id="product-dialog-title">{product.name}</h2>
            <p>{product.description}</p>
            <strong>{formatMoney(Math.round(product.price * 100))}</strong>
          </div>
          <section className="product-option-section" aria-labelledby="addons-heading">
            <div className="option-heading"><h3 id="addons-heading">Adicione algo especial</h3><span>Opcional</span></div>
            <div className="options-list">
              {addOns.map((addon) => <label className="shop-checkbox" key={addon.id}>
                <input type="checkbox" checked={addonIds.includes(addon.id)} onChange={() => toggle(addon.id, addonIds, setAddonIds)} />
                <span className="shop-checkbox-mark" aria-hidden="true" />
                <span className="shop-checkbox-name">{addon.name}</span>
                <strong>+ {formatMoney(Math.round(addon.price * 100))}</strong>
              </label>)}
            </div>
          </section>
          <section className="product-option-section" aria-labelledby="removals-heading">
            <div className="option-heading"><h3 id="removals-heading">Retirar ingredientes</h3><span>Opcional</span></div>
            <div className="remove-ingredients">
              {product.ingredients.map((ingredient) => <button type="button" key={ingredient.id}
                className={`remove-chip ${removedIngredientIds.includes(ingredient.id) ? "is-removed" : ""}`}
                aria-pressed={removedIngredientIds.includes(ingredient.id)}
                onClick={() => toggle(ingredient.id, removedIngredientIds, setRemovedIngredientIds)}>
                {removedIngredientIds.includes(ingredient.id) ? "✓ Sem " : "− "}{ingredient.name}
              </button>)}
            </div>
          </section>
        </div>
      </div>}
      {draft && <div className="shop-dialog-footer product-dialog-footer">
        <div className="quantity-control" aria-label="Quantidade">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity <= 1} aria-label="Diminuir quantidade">−</button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" onClick={() => setQuantity((value) => Math.min(30, value + 1))} disabled={quantity >= 30} aria-label="Aumentar quantidade">+</button>
        </div>
        <button className="shop-primary product-add-button" type="button" onClick={submit}>
          <span>{editingKey ? "Salvar alterações" : "Adicionar ao carrinho"}</span>
          <strong>{formatMoney(unit * quantity)}</strong>
        </button>
      </div>}
    </dialog>
  );
});
export default ProductDialog;
