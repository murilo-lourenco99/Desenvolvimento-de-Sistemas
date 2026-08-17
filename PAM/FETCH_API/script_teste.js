// Substitua pela URL da sua API ou arquivo JSON
const url = "https://fakestoreapi.com/users";

async function atualizarTabela() {
    try {
        // 1. Busca os dados na URL
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // 2. Captura o corpo da tabela existente
        const tbody = document.getElementById("minha-tabela").querySelector("tbody");

        // 3. Limpa as linhas antigas para não duplicar (remova se quiser apenas somar)
        tbody.innerHTML = "";

        // 4. Cria e adiciona as novas linhas automaticamente
        dados.forEach(item => {
            const novaLinha = tbody.insertRow(); // Cria um <tr> automático

            const celulaNome = novaLinha.insertCell(); // Cria o primeiro <td>
            celulaNome.textContent = item.nome;       // Insere o dado do nome

            const celulaIdade = novaLinha.insertCell(); // Cria o segundo <td>
            celulaIdade.textContent = item.idade;       // Insere o dado da idade
        });

    } catch (erro) {
        console.error("Erro ao buscar dados da URL:", erro);
    }
}

// Executa a função automaticamente ao carregar a página
atualizarTabela();
