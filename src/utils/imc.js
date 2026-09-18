import { data } from "../data/data";

export const paraNumero = (valor) => Number(String(valor).replace(",", "."));

export const calcularImc = (alturaCm, pesoKg) => {
  const altura = paraNumero(alturaCm) / 100;
  const peso = paraNumero(pesoKg);
  if (!altura || !peso) return null;
  return +(peso / (altura * altura)).toFixed(2);
};

export const classificar = (imc) =>
  data.find((item) => imc >= item.min && imc <= item.max) ?? data[data.length - 1];

export const pesoIdeal = (alturaCm) => {
  const altura = paraNumero(alturaCm) / 100;
  if (!altura) return null;
  return {
    min: +(18.5 * altura * altura).toFixed(1),
    max: +(24.9 * altura * altura).toFixed(1),
  };
};

export const diferencaParaFaixa = (pesoKg, faixa) => {
  const peso = paraNumero(pesoKg);
  if (!faixa) return null;
  if (peso < faixa.min) return { tipo: "ganhar", valor: +(faixa.min - peso).toFixed(1) };
  if (peso > faixa.max) return { tipo: "perder", valor: +(peso - faixa.max).toFixed(1) };
  return { tipo: "manter", valor: 0 };
};

export const calcularTmb = (pesoKg, alturaCm, idade, genero) => {
  const peso = paraNumero(pesoKg);
  const altura = paraNumero(alturaCm);
  if (!peso || !altura || !idade) return null;
  const base = 10 * peso + 6.25 * altura - 5 * idade;
  return Math.round(genero === "feminino" ? base - 161 : base + 5);
};
