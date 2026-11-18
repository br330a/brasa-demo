// Busca normalizada: ignora acentos, espaços duplicados e letras maiúsculas.
export function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim()
    .replace(/\s+/g, " ");
}

export function searchProducts(products, categoryId, query) {
  const tokens = normalizeSearch(query).split(" ").filter(Boolean);

  return products.filter((product) => {
    if (categoryId !== "todos" && product.category !== categoryId) return false;
    if (!tokens.length) return true;

    const searchable = normalizeSearch(`${product.name} ${product.description}`);
    return tokens.every((token) => searchable.includes(token));
  });
}
