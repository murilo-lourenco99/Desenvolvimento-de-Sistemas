export async function get_json() {
  let dados_session = sessionStorage.getItem("pontuacao");

  if (dados_session) {
    return JSON.parse(dados_session);
  }

  let response = await fetch("../js/jojo.json");
  let jojos = await response.json();

  if (!jojos || jojos.length === 0) {
    window.location.href = "../index.html";
    return null;
  }

  sessionStorage.setItem("pontuacao", JSON.stringify(jojos));
  return jojos;
}
