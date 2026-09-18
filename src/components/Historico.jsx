import "./Historico.css";

const Historico = ({ itens, limpar }) => {
  if (!itens.length) return null;

  return (
    <section className="historico">
      <div className="historico-topo">
        <h2>Cálculos salvos</h2>
        <button type="button" onClick={limpar}>
          Apagar tudo
        </button>
      </div>
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            <span className="historico-imc">{item.imc.toFixed(2)}</span>
            <span className="historico-info">{item.info}</span>
            <span className="historico-data">{item.data}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Historico;