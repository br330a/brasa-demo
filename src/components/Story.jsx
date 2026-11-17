const values = [
  { id: "01", title: "O ponto certo", text: "Carne suculenta e preparo sem pressa." },
  { id: "02", title: "Menos é mais", text: "Ingrediente bom não precisa de disfarce." },
  { id: "03", title: "A sua maneira", text: "Uma experiência que respeita seu gosto." },
];

export default function Story() {
  return (
    <section className="story-section" id="essencia" aria-labelledby="story-title">
      <div className="container story-grid">
        <div className="story-title-wrap">
          <p className="kicker"><span className="kicker-line" aria-hidden="true" /> NOSSA ESSÊNCIA</p>
          <h2 id="story-title">COMIDA BOA<br />NÃO TEM<br /><em>SEGREDO.</em></h2>
        </div>
        <div className="story-values">
          {values.map((value) => (
            <div className="story-value" key={value.id}>
              <span>{value.id}</span>
              <div><h3>{value.title}</h3><p>{value.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
