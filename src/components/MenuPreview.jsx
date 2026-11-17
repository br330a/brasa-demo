import { useState } from "react";
import { categories, products } from "../data/menu.js";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const visibleProducts = activeCategory === "todos"
    ? products
    : products.filter((product) => product.category === activeCategory);

  return (
    <section className="menu-section" id="cardapio" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu-heading">
          <div>
            <p className="kicker"><span className="kicker-line" aria-hidden="true" /> NOSSO CARDÁPIO</p>
            <h2 id="menu-title">BOM DE OLHAR.<br /><span>MELHOR DE PROVAR.</span></h2>
          </div>
          <p className="menu-intro">Os favoritos da casa, preparados para quem leva hambúrguer a sério.</p>
        </div>
        <div className="category-filters" role="group" aria-label="Filtrar cardápio por categoria">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-button ${activeCategory === category.id ? "is-active" : ""}`}
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.imageAlt} width="768" height="512" loading="lazy" decoding="async" />
                {product.highlight && <span className="product-highlight">{product.highlight}</span>}
              </div>
              <div className="product-detail">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>{currency.format(product.price)}</strong>
              </div>
            </article>
          ))}
        </div>
        <p className="demo-disclaimer">Projeto demonstrativo: produtos e preços fictícios. Pedidos e personalização serão implementados na próxima etapa.</p>
      </div>
    </section>
  );
}
