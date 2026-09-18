import "./Stepper.css";

const Stepper = ({ label, value, onChange, min = 1, max = 300, step = 1, sufixo }) => {
  const alterar = (delta) => {
    const proximo = Math.min(max, Math.max(min, Number(value || 0) + delta));
    onChange(proximo);
  };

  const digitar = (e) => {
    const limpo = e.target.value.replace(/[^0-9]/g, "");
    if (limpo === "") return onChange("");
    onChange(Math.min(max, Number(limpo)));
  };

  return (
    <div className="stepper">
      <label className="campo-label" htmlFor={`stepper-${label}`}>
        {label}
      </label>

      <input
        id={`stepper-${label}`}
        className="stepper-valor"
        type="text"
        inputMode="numeric"
        value={value}
        onChange={digitar}
        onBlur={() => onChange(Math.max(min, Number(value || min)))}
        aria-label={label}
      />
      {sufixo && <span className="stepper-sufixo">{sufixo}</span>}

      <div className="stepper-botoes">
        <button type="button" onClick={() => alterar(-step)} aria-label={`Diminuir ${label}`}>
          &minus;
        </button>
        <button type="button" onClick={() => alterar(step)} aria-label={`Aumentar ${label}`}>
          +
        </button>
      </div>
    </div>
  );
};

export default Stepper;