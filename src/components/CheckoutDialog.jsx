import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { business } from "../data/business.js";
import { formatMoney, getLineAdjustments, getProduct, itemCount, totalCents, unitPriceCents } from "../utils/cart.js";
import { buildOrderMessage, validateCheckout } from "../utils/checkout.js";
import { CloseIcon } from "./ShopIcons.jsx";

const initialForm = {
  fulfillment: "retirada",
  name: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  complement: "",
  notes: "",
};

const CheckoutDialog = forwardRef(function CheckoutDialog({ cart, onBackCart }, ref) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState("");
  const [manualMessage, setManualMessage] = useState("");

  function open() {
    setFeedback("");
    setManualMessage("");
    if (cart.length && !dialogRef.current?.open) dialogRef.current?.showModal();
  }

  useImperativeHandle(ref, () => ({ open }));

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setFeedback("");
    setManualMessage("");
  }

  function backToCart() {
    dialogRef.current?.close();
    onBackCart();
  }

  async function submit(event) {
    event.preventDefault();
    const error = validateCheckout(cart, form);
    if (error) {
      setFeedback(error);
      return;
    }

    const message = buildOrderMessage(cart, form);
    const phone = business.whatsappNumber.replace(/\D/g, "");

    if (phone) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setFeedback("Pedido preparado no WhatsApp. Envie a mensagem para solicitar a confirmação.");
      return;
    }

    // Demonstração: nunca aponta para um número de telefone inventado.
    try {
      await navigator.clipboard.writeText(message);
      setFeedback("Solicitação copiada! Você pode colar a mensagem no WhatsApp. Nenhum pedido real foi enviado.");
    } catch {
      setManualMessage(message);
      setFeedback("Não foi possível copiar automaticamente. Selecione e copie a mensagem abaixo.");
    }
  }

  const subtotal = totalCents(cart);
  const count = itemCount(cart);

  return (
    <dialog
      ref={dialogRef}
      className="shop-dialog checkout-dialog"
      aria-labelledby="checkout-title"
      onClose={() => { setFeedback(""); setManualMessage(""); }}
    >
      <form className="checkout-form" onSubmit={submit}>
        <div className="checkout-top">
          <div>
            <p className="shop-eyebrow">ÚLTIMA ETAPA</p>
            <h2 id="checkout-title">Finalizar pedido</h2>
          </div>
          <button type="button" className="shop-close" aria-label="Fechar finalização" onClick={() => dialogRef.current?.close()}>
            <CloseIcon />
          </button>
        </div>

        <div className="checkout-scroll">
          <fieldset className="checkout-section checkout-method">
            <legend>Como você prefere receber?</legend>
            <div className="checkout-choices">
              <label className={`checkout-choice ${form.fulfillment === "retirada" ? "is-active" : ""}`}>
                <input type="radio" name="fulfillment" value="retirada" checked={form.fulfillment === "retirada"} onChange={() => update("fulfillment", "retirada")} />
                <span className="checkout-choice-main">Retirar no balcão <small>O local será informado na confirmação</small></span>
                <span className="checkout-choice-check" aria-hidden="true" />
              </label>
              <label className={`checkout-choice ${form.fulfillment === "entrega" ? "is-active" : ""}`}>
                <input type="radio" name="fulfillment" value="entrega" checked={form.fulfillment === "entrega"} onChange={() => update("fulfillment", "entrega")} />
                <span className="checkout-choice-main">Receber em casa <small>Disponibilidade e taxa a confirmar</small></span>
                <span className="checkout-choice-check" aria-hidden="true" />
              </label>
            </div>
          </fieldset>

          <section className="checkout-section" aria-labelledby="checkout-data-title">
            <h3 id="checkout-data-title">Seus dados</h3>
            <label className="checkout-field">
              Seu nome
              <input type="text" autoComplete="name" placeholder="Como podemos chamar você?" maxLength={80} value={form.name} onChange={event => update("name", event.target.value)} required />
            </label>

            {form.fulfillment === "entrega" && <div className="checkout-address">
              <p className="checkout-help">Endereço para solicitar a entrega. A região atendida será confirmada pelo restaurante.</p>
              <div className="checkout-row checkout-street-row">
                <label className="checkout-field">Rua ou avenida
                  <input type="text" autoComplete="address-line1" maxLength={100} placeholder="Nome da via" value={form.street} onChange={event => update("street", event.target.value)} required />
                </label>
                <label className="checkout-field">Número
                  <input type="text" maxLength={15} placeholder="Nº" value={form.number} onChange={event => update("number", event.target.value)} required />
                </label>
              </div>
              <div className="checkout-row">
                <label className="checkout-field">Bairro
                  <input type="text" maxLength={80} placeholder="Bairro" value={form.neighborhood} onChange={event => update("neighborhood", event.target.value)} required />
                </label>
                <label className="checkout-field">Cidade
                  <input type="text" autoComplete="address-level2" maxLength={80} placeholder="Cidade" value={form.city} onChange={event => update("city", event.target.value)} required />
                </label>
              </div>
              <label className="checkout-field">Complemento <span className="checkout-optional">(opcional)</span>
                <input type="text" autoComplete="address-line2" maxLength={100} placeholder="Apartamento, referência..." value={form.complement} onChange={event => update("complement", event.target.value)} />
              </label>
            </div>}

            <label className="checkout-field checkout-notes">Observações do pedido <span className="checkout-optional">(opcional)</span>
              <textarea rows={2} maxLength={300} placeholder="Algum pedido especial?" value={form.notes} onChange={event => update("notes", event.target.value)} />
            </label>
          </section>

          <section className="checkout-section checkout-summary" aria-labelledby="checkout-summary-title">
            <div className="checkout-summary-heading">
              <h3 id="checkout-summary-title">Resumo do pedido</h3>
              <span>{count} {count === 1 ? "item" : "itens"}</span>
            </div>
            <div className="checkout-summary-items">
              {cart.map(line => {
                const product = getProduct(line.productId);
                if (!product) return null;
                const { extras, removals } = getLineAdjustments(line);
                return <div className="checkout-summary-line checkout-summary-product" key={line.key}>
                  <div className="checkout-summary-description">
                    <span className="checkout-summary-product-name">{line.quantity}× {product.name}</span>
                    {extras.length > 0 && <small>+ {extras.join(", ")}</small>}
                    {removals.length > 0 && <small>Sem: {removals.join(", ")}</small>}
                  </div>
                  <strong>{formatMoney(unitPriceCents(line) * line.quantity)}</strong>
                </div>;
              })}
            </div>
            <div className="checkout-summary-line checkout-subtotal"><span>Subtotal dos itens</span><strong>{formatMoney(subtotal)}</strong></div>
            {form.fulfillment === "entrega" && <div className="checkout-summary-line checkout-delivery-fee"><span>Taxa de entrega</span><strong>A confirmar</strong></div>}
            <p className="checkout-help">Valores demonstrativos. {form.fulfillment === "entrega" ? "O total final será informado após confirmação da taxa e disponibilidade." : "Local e disponibilidade serão confirmados pelo restaurante."}</p>
          </section>
          {feedback && <p className="checkout-feedback" role="status" aria-live="polite">{feedback}</p>}
          {manualMessage && <label className="checkout-field checkout-manual">Mensagem para copiar<textarea readOnly rows={8} value={manualMessage} onFocus={event => event.target.select()} /></label>}
        </div>

        <div className="checkout-bottom">
          <button className="checkout-back" type="button" onClick={backToCart}>← Voltar ao carrinho</button>
          <button className="shop-primary checkout-send" type="submit">
            {business.whatsappNumber ? "Continuar no WhatsApp" : "Copiar pedido"} <span aria-hidden="true">↗</span>
          </button>
          <p>Solicitação demonstrativa. Nenhum pedido é confirmado automaticamente.</p>
        </div>
      </form>
    </dialog>
  );
});

export default CheckoutDialog;
