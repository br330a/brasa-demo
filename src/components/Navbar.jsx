import { useState } from "react";
import { BagIcon } from "./ShopIcons.jsx";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Nossa essência", href: "#essencia" },
];

export default function Navbar({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="wordmark" aria-label="BRASA, ir ao início" onClick={() => setIsOpen(false)}>
          BRASA<span className="brand-period">.</span>
        </a>
        <nav id="primary-navigation" className={`primary-navigation ${isOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-order-link" href="#cardapio">Explorar menu <span aria-hidden="true">↗</span></a>
          <button type="button" className="nav-cart-button" onClick={onOpenCart} aria-label={`Abrir carrinho, ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}>
            <BagIcon />{cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
          </button>
          <button type="button" className="nav-toggle" aria-label={isOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen((current) => !current)}>
            <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
