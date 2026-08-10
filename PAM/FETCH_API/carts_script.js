// fonte de dados
let url = "https://fakestoreapi.com/carts";

// request - promise
let res = await fetch(url);

// tratamento de respota - response
let dados = await res.json();

let linhas = document.querySelectorAll("tr");
console.log("Linhas da tr: ok");
console.log(linhas[0].children);

for (let i = 0; i < linhas.length; i++) {
  let filhos = linhas[i + 1].children;

  filhos[0].textContent = dados[i].id;
  filhos[1].textContent = dados[i].userId;
  filhos[2].textContent = dados[i].date;
  filhos[3].textContent = dados[i].products[0].productId;
  filhos[4].textContent = dados[i].products[0].quantity;
  console.log(dados[i]);
}

console.log("Tabela pronta para preenchimento");
