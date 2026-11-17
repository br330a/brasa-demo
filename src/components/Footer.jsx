export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <a href="#inicio" className="wordmark footer-wordmark" aria-label="BRASA, voltar ao início">BRASA<span className="brand-period">.</span></a>
          <p>Comida de verdade. Experiência sem complicação.</p>
        </div>
        <div className="footer-right"><p>Projeto de portfólio · Restaurante fictício</p><span>© {new Date().getFullYear()} BRASA. — Demonstração</span></div>
      </div>
    </footer>
  );
}
