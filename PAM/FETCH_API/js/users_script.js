// fonte de dados
let url = "https://fakestoreapi.com/users";

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
  filhos[1].textContent = dados[i].username;
  filhos[2].textContent = dados[i].address.city;
  filhos[3].textContent = dados[i].email;
  filhos[4].textContent = dados[i].name.firstname;
  filhos[5].textContent = dados[i].phone;
  console.log(dados[i]);
}

console.log("Tabela pronta para preenchimento");
