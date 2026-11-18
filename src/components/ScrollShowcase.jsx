import { useEffect, useRef } from "react";

const layers = [
  {
    id: "top",
    src: "/images/scroll/pao-superior.webp",
    height: 336,
    shift: -106,
  },
  {
    id: "greens",
    src: "/images/scroll/vegetais.webp",
    height: 240,
    shift: -45,
  },
  {
    id: "cheese",
    src: "/images/scroll/cheddar.webp",
    height: 190,
    shift: 14,
  },
  {
    id: "meat",
    src: "/images/scroll/blend.webp",
    height: 280,
    shift: 60,
  },
  {
    id: "pickles",
    src: "/images/scroll/picles-cebola.webp",
    height: 208,
    shift: 106,
  },
  {
    id: "bottom",
    src: "/images/scroll/pao-inferior.webp",
    height: 238,
    shift: 164,
  },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function ScrollShowcase() {
  const sectionRef = useRef(null);
  const artRef = useRef(null);
  const layerRefs = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const art = artRef.current;
    if (!section || !art) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!desktop.matches) return;

      const rect = section.getBoundingClientRect();
      const stickyTop = 82;
      const scrollingDistance = Math.max(
        1,
        rect.height - (window.innerHeight - stickyTop),
      );
      const progress = reducedMotion.matches
        ? 0.8
        : clamp((stickyTop - rect.top) / scrollingDistance, 0, 1);
      // Easing suave no início e no final, sem alterar o scroll do navegador.
      const eased = progress * progress * (3 - 2 * progress);
      const scale = clamp(art.clientWidth / 420, 0.75, 1.05);

      layerRefs.current.forEach((element, index) => {
        if (!element) return;
        const translate = Math.round(layers[index].shift * scale * eased);
        element.style.transform = `translate3d(-50%, ${translate}px, 0)`;
      });

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener?.("change", schedule);
    reducedMotion.addEventListener?.("change", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener?.("change", schedule);
      reducedMotion.removeEventListener?.("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="scroll-showcase"
      ref={sectionRef}
      aria-labelledby="showcase-title"
    >
      <div className="showcase-sticky">
        <div className="container showcase-layout">
          <div className="showcase-content">
            <p className="showcase-overline">POR DENTRO DA BRASA. / 01</p>
            <h2 id="showcase-title">
              NÃO É SÓ
              <br />
              UM BURGER.
              <br />
              <em>É CADA CAMADA.</em>
            </h2>
            <p className="showcase-description">
              Pão tostado, ingredientes frescos, cheddar derretendo e
              um blend feito no ponto. O sabor está em cada detalhe.
            </p>
            <a className="showcase-link" href="#cardapio">
              Ir direto ao cardápio <span aria-hidden="true">↗</span>
            </a>
            <div className="showcase-scroll-hint" aria-hidden="true">
              <span>ROLE PARA DESCOBRIR</span>
              <span className="showcase-progress-track">
                <span ref={progressRef} className="showcase-progress-fill" />
              </span>
            </div>
          </div>

          <div
            ref={artRef}
            className="showcase-art"
            role="img"
            aria-label="Hambúrguer artesanal ilustrado com pão, verduras, cheddar, carnes, picles e cebola separados em camadas"
          >
            <div className="showcase-aura" aria-hidden="true" />
            {layers.map((layer, index) => (
              <img
                key={layer.id}
                ref={(node) => { layerRefs.current[index] = node; }}
                className={`showcase-layer showcase-layer-${layer.id}`}
                src={layer.src}
                alt=""
                aria-hidden="true"
                width="1024"
                height={layer.height}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            ))}
            <span className="showcase-art-stamp" aria-hidden="true">100% PERSONALIDADE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
