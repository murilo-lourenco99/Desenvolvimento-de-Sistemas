// fonte de dados
let url = "https://fakestoreapi.com/users";

// request - promise
let res = await fetch(url);

// tratamento de respota - response
let dados = await res.json();

// função para adicionar linhas de forma automatica na tabela
async function atualizarTabela() {
    try {
        const tbody = document.getElementById("minha-tabela").querySelector("tbody");

    } catch (error) {

    }
}