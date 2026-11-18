import { useState } from "react";
import { categories, products } from "../data/menu.js";
import { formatMoney } from "../utils/cart.js";

export default function MenuPreview({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const visibleProducts = activeCategory === "todos"
    ? products : products.filter((product) => product.category === activeCategory);

  return (
    <section className="menu-section" id="cardapio" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu-heading">
          <div><p className="kicker"><span className="kicker-line" aria-hidden="true" /> NOSSO CARDÁPIO</p><h2 id="menu-title">BOM DE OLHAR.<br /><span>MELHOR DE PROVAR.</span></h2></div>
          <p className="menu-intro">Os favoritos da casa, preparados para quem leva hambúrguer a sério.</p>
        </div>
        <div className="category-filters" role="group" aria-label="Filtrar cardápio por categoria">
          {categories.map((category) => <button key={category.id} type="button" className={`category-button ${activeCategory === category.id ? "is-active" : ""}`} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}
        </div>
        <div className="products-grid">
          {visibleProducts.map((product) => <article className="product-card" key={product.id}>
            <button className="product-card-trigger" type="button" onClick={() => onSelectProduct(product)} aria-label={`Personalizar ${product.name}, a partir de ${formatMoney(Math.round(product.price * 100))}`}>
              <div className="product-image-wrap"><img src={product.image} alt="" width="768" height="512" loading="lazy" decoding="async" />{product.highlight && <span className="product-highlight">{product.highlight}</span>}</div>
              <div className="product-detail"><h3>{product.name}</h3><p>{product.description}</p><div className="product-card-bottom"><strong>{formatMoney(Math.round(product.price * 100))}</strong><span className="product-plus" aria-hidden="true">+</span></div></div>
            </button>
          </article>)}
        </div>
        <p className="demo-disclaimer">Projeto demonstrativo: produtos e preços fictícios. Nenhum pedido real é processado.</p>
      </div>
    </section>
  );
}
