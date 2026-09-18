import { useEffect, useState } from "react";
import "./App.css";
import ImcCalc from "./components/ImcCalc";
import ImcTable from "./components/ImcTable";
import Historico from "./components/Historico";
import { calcularImc, classificar } from "./utils/imc";

const CHAVE = "imc-historico";

const lerHistorico = () => {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
  } catch {
    return [];
  }
};

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");
  const [dados, setDados] = useState(null);
  const [salvo, setSalvo] = useState(false);
  const [historico, setHistorico] = useState(lerHistorico);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(historico));
    } catch {
      
    }
  }, [historico]);

  const calcImc = ({ altura, peso, idade, genero }) => {
    const resultado = calcularImc(altura, peso);
    if (!resultado) return;

    const faixa = classificar(resultado);
    setImc(resultado);
    setInfo(faixa.info);
    setInfoClass(faixa.infoclass);
    setDados({ altura, peso, idade, genero });
    setSalvo(false);
  };

  const resetCalc = (e) => {
    e.preventDefault();
    setImc("");
    setInfo("");
    setInfoClass("");
    setDados(null);
    setSalvo(false);
  };

  const salvar = (e) => {
    e.preventDefault();
    if (salvo) return;
    const registro = {
      id: Date.now(),
      imc,
      info,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setHistorico((atual) => [registro, ...atual].slice(0, 8));
    setSalvo(true);
  };

  const limparHistorico = () => setHistorico([]);

  return (
    <main className="pagina">
      <div className="container">
        {!imc ? (
          <ImcCalc calcImc={calcImc} />
        ) : (
          <ImcTable
            imc={imc}
            info={info}
            infoClass={infoClass}
            dados={dados}
            resetCalc={resetCalc}
            salvar={salvar}
            salvo={salvo}
          />
        )}
      </div>

      <Historico itens={historico} limpar={limparHistorico} />
    </main>
  );
}

export default App;