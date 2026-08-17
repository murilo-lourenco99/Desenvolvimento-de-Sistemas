// 1. Dados que vão entrar na tabela
const pessoas = [
    { nome: "Ana", idade: 25 },
    { nome: "Bruno", idade: 30 }
];

// 2. Criar os elementos HTML principais
const tabela = document.createElement("table");
const cabecalho = document.createElement("tr");

// 3. Montar o cabeçalho
["Nome", "Idade"].forEach(texto => {
    const th = document.createElement("th");
    th.textContent = texto;
    cabecalho.appendChild(th);
});
tabela.appendChild(cabecalho);

// 4. Inserir linhas automáticas com os dados
pessoas.forEach(dado => {
    const linha = document.createElement("tr");

    const celulaNome = document.createElement("td");
    celulaNome.textContent = dado.nome;
    linha.appendChild(celulaNome);

    const celulaIdade = document.createElement("td");
    celulaIdade.textContent = dado.idade;
    linha.appendChild(celulaIdade);

    tabela.appendChild(linha);
});

// 5. Jogar a tabela pronta dentro do HTML
document.getElementById("tabela-aqui").appendChild(tabela);
