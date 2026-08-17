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


async function carregarTodasAsTabelas() {
    // 1. Procura todas as tabelas automáticas da página
    const tabelas = document.querySelectorAll(".tabela-automatica");
  
    tabelas.forEach(async (tabela) => {
      // 2. Pega a URL configurada no HTML daquela tabela específica
      const url = tabela.getAttribute("data-url");
      if (!url) return;
  
      try {
        // 3. Busca os dados na API
        const resposta = await fetch(url);
        const dados = await resposta.json();
  
        const tbody = tabela.querySelector("tbody");
        tbody.innerHTML = ""; // Limpa dados antigos
  
        // 4. Descobre quais colunas mapear com base no cabeçalho (th)
        const ths = tabela.querySelectorAll("thead th");
        const chavesDasColunas = Array.from(ths).map(th => th.getAttribute("data-chave"));
  
        // 5. Alimenta a tabela linha por linha
        dados.forEach(item => {
          const novaLinha = tbody.insertRow();
  
          // Cria cada célula combinando a ordem do HTML com o dado do JSON
          chavesDasColunas.forEach(chave => {
            const celula = novaLinha.insertCell();
            // Insere o dado se ele existir no JSON, senão deixa vazio
            celula.textContent = item[chave] !== undefined ? item[chave] : ""; 
          });
        });
  
      } catch (erro) {
        console.error(`Erro ao carregar dados da tabela (${url}):`, erro);
      }
    });
  }
  
  // Inicializa o script automaticamente ao carregar a página
  document.addEventListener("DOMContentLoaded", carregarTodasAsTabelas);
  