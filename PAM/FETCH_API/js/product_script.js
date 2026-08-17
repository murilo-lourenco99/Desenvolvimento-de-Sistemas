// fonte de dados via link url
let url = "https://fakestoreapi.com/Products";

// request - promise
let res = await fetch(url);

// tratamento de respota - response
let dados = await res.json();

let linhas = document.querySelectorAll("tr");
console.log("Linhas da tr: ok");
console.log(linhas[0].children);

for (let i = 0; i < linhas.length; i++) {
  let filhos = linhas[i + 1].children;

  filhos[0].textContent = dados[i].id; //  id
  filhos[1].textContent = dados[i].category; //  categoria
  filhos[2].textContent = dados[i].price; //  preço
  filhos[3].textContent = dados[i].description; //  descrição
  console.log(dados[i]);
}

console.log("Tabela pronta para preenchimento");
