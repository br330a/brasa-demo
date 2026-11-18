import { formatMoney, getLineAdjustments, getProduct, totalCents, unitPriceCents } from "./cart.js";

export function validateCheckout(cart, form) {
  if (!Array.isArray(cart) || cart.length === 0) return "Seu carrinho está vazio.";
  if (!form.name?.trim()) return "Informe seu nome para continuar.";
  if (form.fulfillment !== "retirada" && form.fulfillment !== "entrega") {
    return "Escolha entrega ou retirada.";
  }
  if (form.fulfillment === "entrega") {
    if (!form.street?.trim()) return "Informe a rua ou avenida.";
    if (!form.number?.trim()) return "Informe o número do endereço.";
    if (!form.neighborhood?.trim()) return "Informe o bairro.";
    if (!form.city?.trim()) return "Informe a cidade.";
  }
  return null;
}

function cleanText(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export function buildOrderMessage(cart, form) {
  const error = validateCheckout(cart, form);
  if (error) throw new Error(error);

  const lines = [
    "*BRASA. — Solicitação de pedido*",
    "_Projeto demonstrativo — não é um pedido real_",
    "",
    `*Cliente:* ${cleanText(form.name)}`,
    `*Modalidade:* ${form.fulfillment === "entrega" ? "Entrega (a confirmar)" : "Retirada (local a confirmar)"}`,
  ];

  if (form.fulfillment === "entrega") {
    const address = `${cleanText(form.street)}, ${cleanText(form.number)}`;
    lines.push(`*Endereço:* ${address}`);
    lines.push(`*Bairro:* ${cleanText(form.neighborhood)}`);
    lines.push(`*Cidade:* ${cleanText(form.city)}`);
    if (form.complement?.trim()) lines.push(`*Complemento:* ${cleanText(form.complement)}`);
  }

  lines.push("", "*Itens do pedido:*");
  cart.forEach((line, index) => {
    const product = getProduct(line.productId);
    if (!product) return;
    lines.push(`${index + 1}. ${line.quantity}x ${product.name} — ${formatMoney(unitPriceCents(line) * line.quantity)}`);
    const { extras, removals } = getLineAdjustments(line);
    if (extras.length) lines.push(`   + ${extras.join(", ")}`);
    if (removals.length) lines.push(`   Sem: ${removals.join(", ")}`);
  });

  lines.push("", `*Subtotal dos itens:* ${formatMoney(totalCents(cart))}`);
  if (form.fulfillment === "entrega") {
    lines.push("*Taxa de entrega:* a confirmar com o restaurante");
    lines.push("*Total com entrega:* a confirmar");
  }
  if (form.notes?.trim()) lines.push(`*Observações:* ${cleanText(form.notes)}`);
  lines.push("", "Gostaria de confirmar disponibilidade, valor final e prazo, por favor.");
  return lines.join("\n");
}
