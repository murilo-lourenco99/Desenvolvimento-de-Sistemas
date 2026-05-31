// js/resultado.js
import { get_json } from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
  let dados_json = await get_json();

  if (!dados_json) return;

  // Ele faz uma varredura comparando o herói 'atual' com o 'maior' encontrado até agora.
  // Se o atual tiver mais pontos (j) que o maior anterior, ele vira o novo maior!
  let vencedor = dados_json.reduce((maior, atual) => {
    return atual.j > maior.j ? atual : maior;
  });

  const spanVencedor = document.getElementById("nome-vencedor");

  if (spanVencedor) {
    let nomeFormatado =
      vencedor.nome.charAt(0).toUpperCase() + vencedor.nome.slice(1);

    spanVencedor.textContent = nomeFormatado;

    console.log(
      `%c[Resultado] O grande campeão foi ${vencedor.nome} com ${vencedor.j} pontos!`,
      "color: #9b59b6; font-weight: bold; font-size: 14px;",
    );
  }
});
