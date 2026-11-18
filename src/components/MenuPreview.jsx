import { useState } from "react";
import { categories, products } from "../data/menu.js";
import { formatMoney } from "../utils/cart.js";
import { searchProducts } from "../utils/search.js";

export default function MenuPreview({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [query, setQuery] = useState("");
  const visibleProducts = searchProducts(products, activeCategory, query);
  const countFor = (id) => id === "todos" ? products.length : products.filter((p) => p.category === id).length;
  const groups = categories
    .filter((category) => category.id !== "todos")
    .map((category) => ({
      ...category,
      items: visibleProducts.filter((product) => product.category === category.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="menu-section" id="cardapio" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu-heading">
          <div>
            <p className="kicker"><span className="kicker-line" aria-hidden="true" /> NOSSO CARDÁPIO</p>
            <h2 id="menu-title">BOM DE OLHAR.<br /><span>MELHOR DE PROVAR.</span></h2>
          </div>
          <p className="menu-intro">Hambúrgueres artesanais, acompanhamentos, bebidas e sobremesas para uma experiência completa.</p>
        </div>

        <div className="menu-controls">
          <div className="category-filters" role="group" aria-label="Filtrar cardápio por categoria">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`category-button ${activeCategory === category.id ? "is-active" : ""}`}
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.label}</span>
                <span className="category-count" aria-hidden="true">{countFor(category.id)}</span>
              </button>
            ))}
          </div>
          <label className="menu-search">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Buscar produto no cardápio</span>
            <input
              type="search"
              placeholder="Buscar no cardápio"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              enterKeyHint="search"
            />
          </label>
        </div>

        <p className="menu-result-count" role="status" aria-live="polite">
          {visibleProducts.length} {visibleProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>

        {groups.length ? groups.map((group) => (
          <section className="menu-category-section" key={group.id} aria-labelledby={`menu-group-${group.id}`}>
            <div className="menu-category-heading">
              <div>
                <h3 id={`menu-group-${group.id}`}>{group.label}</h3>
                <p>{group.description}</p>
              </div>
              <span>{group.items.length} {group.items.length === 1 ? "opção" : "opções"}</span>
            </div>
            <div className="products-grid">
              {group.items.map((product) => (
                <article className="product-card" key={product.id}>
                  <button
                    className="product-card-trigger"
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    aria-label={`Ver ${product.name}, ${formatMoney(Math.round(product.price * 100))}`}
                  >
                    <div className="product-image-wrap">
                      <img src={product.image.replace(/\.webp$/, "-card.webp")} alt="" width="800" height="533" loading="lazy" decoding="async" />
                      {product.highlight && <span className="product-highlight">{product.highlight}</span>}
                    </div>
                    <div className="product-detail">
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                      <div className="product-card-bottom">
                        <strong>{formatMoney(Math.round(product.price * 100))}</strong>
                        <span className="product-plus" aria-hidden="true">+</span>
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </section>
        )) : (
          <div className="menu-empty" role="status">
            <h3>Nenhum produto encontrado.</h3>
            <p>Tente outra busca ou veja todos os itens do cardápio.</p>
            <button
              type="button"
              className="menu-reset"
              onClick={() => { setQuery(""); setActiveCategory("todos"); }}
            >
              Ver todos os produtos <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
        <p className="demo-disclaimer">Projeto demonstrativo: produtos e preços fictícios. Nenhum pedido real é processado.</p>
      </div>
    </section>
  );
}
