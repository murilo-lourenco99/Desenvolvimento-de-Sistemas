import { get_json } from "./main.js";

document.addEventListener("DOMContentLoaded", async () => {
  let dados_json = await get_json();

  const input_opcao = document.querySelectorAll(".q1, .q2");

  input_opcao.forEach((opcao) => {
    opcao.addEventListener("click", (event) => {
      let jojo_escolhido = opcao.getAttribute("data_jojo");
      let jojo_escolhido_json = dados_json.find(
        (j) => j.nome === jojo_escolhido,
      );

      if (jojo_escolhido_json) {
        jojo_escolhido_json.j += 1;
        console.log(
          `%c[Sucesso] +1 ponto para: ${jojo_escolhido_json.nome}. Total atual: ${jojo_escolhido_json.j}`,
          "color: #2ecc71; font-weight: bold;",
        );

        sessionStorage.setItem("pontuacao", JSON.stringify(dados_json));
      }
    });
  });
});
