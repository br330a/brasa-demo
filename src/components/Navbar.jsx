import { useEffect, useRef, useState } from "react";
import { BagIcon } from "./ShopIcons.jsx";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Nossa essência", href: "#essencia" },
];

export default function Navbar({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    function closeOnOutsideClick(event) {
      if (!headerRef.current?.contains(event.target)) setIsOpen(false);
    }
    function closeOnDesktop(event) {
      if (event.matches) setIsOpen(false);
    }

    const desktop = window.matchMedia("(min-width: 761px)");
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  function openCart() {
    setIsOpen(false);
    onOpenCart();
  }

  return (
    <header className="site-header" ref={headerRef}>
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
          <button type="button" className="nav-cart-button" onClick={openCart} aria-label={`Abrir carrinho, ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}>
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
