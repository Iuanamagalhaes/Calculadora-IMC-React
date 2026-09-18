import { useState } from "react";
import Button from "./Button";
import Stepper from "./Stepper";
import GeneroSelect from "./GeneroSelect";
import "./ImcCalc.css";

const ALTURA_MIN = 50;
const ALTURA_MAX = 250;

const ImcCalc = ({ calcImc }) => {
  const [altura, setAltura] = useState(170);
  const [peso, setPeso] = useState(70);
  const [idade, setIdade] = useState(30);
  const [genero, setGenero] = useState("masculino");
  const [erro, setErro] = useState("");

  const limparForm = (e) => {
    e.preventDefault();
    setAltura(170);
    setPeso(70);
    setIdade(30);
    setGenero("masculino");
    setErro("");
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!altura || !peso || !idade) {
      setErro("Preencha altura, peso e idade para calcular.");
      return;
    }
    setErro("");
    calcImc({ altura, peso, idade, genero });
  };

  const progresso = ((altura - ALTURA_MIN) / (ALTURA_MAX - ALTURA_MIN)) * 100;

  return (
    <div id="calc-container">
      <h1>Calculadora de IMC</h1>
      <p className="subtitulo">
        Informe seus dados e descubra em qual faixa de peso você está.
      </p>

      <form id="imc-form" onSubmit={enviar}>
        <div className="cartao altura">
          <label className="campo-label" htmlFor="altura">
            Altura (cm)
          </label>
          <output className="altura-valor">{altura}</output>
          <input
            type="range"
            id="altura"
            name="altura"
            min={ALTURA_MIN}
            max={ALTURA_MAX}
            value={altura}
            onChange={(e) => setAltura(Number(e.target.value))}
            style={{ "--progresso": `${progresso}%` }}
          />
          <div className="altura-limites">
            <span>{ALTURA_MIN} cm</span>
            <span>{ALTURA_MAX} cm</span>
          </div>
        </div>

        <div className="linha-dupla">
          <div className="cartao">
            <Stepper label="Idade" value={idade} onChange={setIdade} min={1} max={120} sufixo="anos" />
          </div>
          <div className="cartao">
            <Stepper label="Peso (kg)" value={peso} onChange={setPeso} min={1} max={400} sufixo="kg" />
          </div>
        </div>

        <div className="cartao">
          <GeneroSelect genero={genero} setGenero={setGenero} />
        </div>

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <div className="action-control">
          <Button id="clear-btn" text="Limpar" variante="secundario" action={limparForm} />
          <Button id="calc-btn" text="Calcular IMC" type="submit" action={enviar} />
        </div>
      </form>
    </div>
  );
};

export default ImcCalc;