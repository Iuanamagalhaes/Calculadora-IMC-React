import Button from "./Button";
import { data } from "../data/data";
import { pesoIdeal, diferencaParaFaixa, calcularTmb } from "../utils/imc";
import "./ImcTable.css";

const ImcTable = ({ imc, info, infoClass, dados, resetCalc, salvar, salvo }) => {
  const faixa = pesoIdeal(dados.altura);
  const diferenca = diferencaParaFaixa(dados.peso, faixa);
  const tmb = calcularTmb(dados.peso, dados.altura, dados.idade, dados.genero);

  const [inteiro, decimal] = String(imc.toFixed(2)).split(".");

  const textoDiferenca = {
    ganhar: `Faltam ${diferenca?.valor} kg para entrar na faixa normal.`,
    perder: `São ${diferenca?.valor} kg acima da faixa normal.`,
    manter: "Seu peso já está dentro da faixa normal.",
  }[diferenca?.tipo];

  return (
    <div id="result-container">
      <h1>Seu resultado</h1>

      <div className={`resultado-destaque ${infoClass}`}>
        <p className="resultado-numero">
          {inteiro}
          <span>,{decimal}</span>
        </p>
        <p className="resultado-info">{info}</p>
        <p className="resultado-resumo">
          {dados.altura} cm · {dados.peso} kg · {dados.idade} anos ·{" "}
          {dados.genero === "feminino" ? "Feminino" : "Masculino"}
        </p>
      </div>

      <div className="cards-extra">
        <div className="card-extra">
          <span className="campo-label">Peso ideal</span>
          <strong>
            {faixa.min} – {faixa.max} kg
          </strong>
          <small>{textoDiferenca}</small>
        </div>
        <div className="card-extra">
          <span className="campo-label">Gasto basal estimado</span>
          <strong>{tmb} kcal/dia</strong>
          <small>Energia que o corpo consome em repouso.</small>
        </div>
      </div>

      <table>
        <caption>Tabela de classificação do IMC</caption>
        <thead>
          <tr>
            <th>IMC</th>
            <th>Classificação</th>
            <th>Obesidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.info} className={infoClass === item.infoclass ? "destaque" : ""}>
              <td>{item.classification}</td>
              <td>{item.info}</td>
              <td>Grau {item.obesity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-control">
        <Button id="back-btn" text="Refazer cálculo" variante="secundario" action={resetCalc} />
        <Button
          id="save-btn"
          text={salvo ? "Resultado salvo" : "Salvar resultado"}
          action={salvar}
        />
      </div>
    </div>
  );
};

export default ImcTable;