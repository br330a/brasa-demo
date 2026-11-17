export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker"><span className="kicker-line" aria-hidden="true" /> HAMBURGUERIA ARTESANAL</p>
          <h1 id="hero-title">O FOGO<br />FAZ PARTE<br /><span>DO SABOR.</span></h1>
          <p className="hero-description">
            Pão macio. Carne no ponto. Ingredientes de verdade.
            Uma experiência feita para quem não aceita qualquer hambúrguer.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#cardapio">Explorar cardápio <span aria-hidden="true">↗</span></a>
            <span className="hero-note">Feito com personalidade, servido sem pressa.</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-photo"
            src="/images/brasa-hero.webp"
            alt="Hambúrguer artesanal duplo com cheddar derretido em cenário escuro"
            width="768"
            height="512"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-visual-top" aria-hidden="true"><span>01 / ORIGINAL DA CASA</span><span>BRASA.</span></div>
          <div className="hero-visual-bottom" aria-hidden="true"><span>FEITO NA BRASA.</span><span>DESDE O PRIMEIRO MORDISCO.</span></div>
        </div>
      </div>
      <div className="container hero-bottom"><span>SEM ATALHOS. SEM EXAGERO.</span><a href="#cardapio">DESCUBRA O MENU <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
