// Criação do button e atribuição de função ao click
const button_cadastro = document.querySelector(".button_cadastro");
button_cadastro.addEventListener("click", cadastro);

const confirmar = document.querySelector(".confirmar");
confirmar.addEventListener("click", confirmarAtualizacao);

// funcao do botao "não" que manda pra pagina de cadastro
function cadastro() {
  window.location.href = "./cadastro.html";
}

// verifica se o usuario ja esta cadastrado
function buscaNome() {
  const nomeDigitado = document.querySelector(".nome").value.trim();
  if (nomeDigitado === "") {
    alert("Por favor, digite seu nome.");
    return false;
  }

  const dadosCadastro = sessionStorage.getItem("usuario");
  if (!dadosCadastro) {
    alert("Nenhum usuário cadastrado foi encontrado.");
    return false;
  }

  const cadastro = JSON.parse(dadosCadastro);
  const usuarios = Array.isArray(cadastro) ? cadastro : [cadastro];


  return true;
}

// botão de confirmar
function confirmarAtualizacao() {
  if (!buscaNome()) {
    return;
  }

  window.location.href = "../pags/index.html";
}
