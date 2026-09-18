import "./GeneroSelect.css";

const IconeMasculino = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="10" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M15 9 L21 3 M15 3 h6 v6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IconeFeminino = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 15 v7 M8.5 19 h7" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const opcoes = [
  { valor: "masculino", texto: "Masculino", Icone: IconeMasculino },
  { valor: "feminino", texto: "Feminino", Icone: IconeFeminino },
];

const GeneroSelect = ({ genero, setGenero }) => (
  <div className="genero" role="radiogroup" aria-label="Gênero">
    <span className="campo-label">Gênero</span>
    <div className="genero-opcoes">
      {opcoes.map(({ valor, texto, Icone }) => (
        <button
          key={valor}
          type="button"
          role="radio"
          aria-checked={genero === valor}
          className={`genero-card ${genero === valor ? "ativo" : ""}`}
          onClick={() => setGenero(valor)}
        >
          <Icone />
          <span>{texto}</span>
        </button>
      ))}
    </div>
  </div>
);

export default GeneroSelect;