import { useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ScrollShowcase from "./components/ScrollShowcase.jsx";
import MenuPreview from "./components/MenuPreview.jsx";
import Story from "./components/Story.jsx";
import Footer from "./components/Footer.jsx";
import ProductDialog from "./components/ProductDialog.jsx";
import CartDialog from "./components/CartDialog.jsx";
import CartDock from "./components/CartDock.jsx";
import CheckoutDialog from "./components/CheckoutDialog.jsx";
import { getProduct, itemCount, totalCents } from "./utils/cart.js";
import { useCart } from "./hooks/useCart.js";

export default function App() {
  const productRef = useRef(null);
  const cartRef = useRef(null);
  const checkoutRef = useRef(null);
  const { cart, addLine, increment, decrement, removeLine } = useCart();
  const [announcement, setAnnouncement] = useState("");
  const count = itemCount(cart);
  const subtotal = totalCents(cart);

  function addToCart(line, editingKey) {
    addLine(line, editingKey);
    setAnnouncement(editingKey ? "Item atualizado no carrinho." : "Item adicionado ao carrinho.");
  }

  function editItem(line) {
    productRef.current?.open(getProduct(line.productId), line);
  }

  return (
    <>
      <Navbar cartCount={count} onOpenCart={() => cartRef.current?.open()} />
      <main id="conteudo"><Hero /><ScrollShowcase /><MenuPreview onSelectProduct={(product) => productRef.current?.open(product)} /><Story /></main>
      <Footer />
      <ProductDialog ref={productRef} onAdd={addToCart} />
      <CartDialog
        ref={cartRef}
        cart={cart}
        increment={increment}
        decrement={decrement}
        removeLine={removeLine}
        onEdit={editItem}
        onCheckout={() => checkoutRef.current?.open()}
      />
      <CheckoutDialog ref={checkoutRef} cart={cart} onBackCart={() => cartRef.current?.open()} />
      <CartDock count={count} total={subtotal} onOpenCart={() => cartRef.current?.open()} />
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
    </>
  );
}
