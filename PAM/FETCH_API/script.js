// fonte de dados
let url = "https://fakestoreapi.com/users";

// request - promise
let res = await fetch(url);

// tratamento de respota - response
let dados = await res.json();

// função para adicionar linhas de forma automatica na tabela
async function atualizarTabela() {
    try {
        const tbody = document.getElementById("tabela").querySelector("tbody");

        dados.array.forEach(item => {
            const novaLinha = tbody.insertRow();
        });

    } catch (error) {
        console.error();
    }
}

export { atualizarTabela };