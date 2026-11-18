// ===================== CONFIGURAÇÃO =====================
const EMAIL_COORDENADOR = "coordenacao@suaescola.edu.br"; // <- troque pelo e-mail real
const DOMINIO_INSTITUCIONAL = "@suaescola.edu.br";        // <- troque pelo domínio da escola

// ===================== ESTADO =====================
let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
let itens = JSON.parse(localStorage.getItem("itens")) || [];

const $ = (id) => document.getElementById(id);

function salvarItens() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

// ===================== LOGIN =====================
$("form-login").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = $("login-nome").value.trim();
  const email = $("login-email").value.trim().toLowerCase();
  const funcao = $("login-funcao").value;

  if (!email.endsWith(DOMINIO_INSTITUCIONAL)) {
    alert(`Use seu e-mail institucional (${DOMINIO_INSTITUCIONAL}).`);
    return;
  }

  usuario = { nome, email, funcao };
  sessionStorage.setItem("usuario", JSON.stringify(usuario));
  iniciarApp();
});

$("btn-sair").addEventListener("click", () => {
  sessionStorage.removeItem("usuario");
  usuario = null;
  $("tela-app").classList.add("oculto");
  $("tela-login").classList.remove("oculto");
});

// ===================== CONTROLE POR FUNÇÃO =====================
function ehCoordenador() {
  return usuario && usuario.funcao === "Coordenador";
}

function iniciarApp() {
  $("tela-login").classList.add("oculto");
  $("tela-app").classList.remove("oculto");
  $("info-usuario").textContent = `${usuario.nome} (${usuario.funcao}) `;

  // Coordenador vê o botão de adicionar; aluno não
  $("area-coordenador").classList.toggle("oculto", !ehCoordenador());

  renderizarItens();
}

// ===================== RENDERIZAÇÃO =====================
function renderizarItens() {
  const lista = $("lista-itens");
  lista.innerHTML = "";

  if (itens.length === 0) {
    lista.textContent = "Nenhum item cadastrado.";
    return;
  }

  itens.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item" + (item.reservadoPor ? " reservado" : "");

    // textContent evita injeção de HTML
    const titulo = document.createElement("strong");
    titulo.textContent = `${item.nome} (${item.tipo})`;

    const desc = document.createElement("p");
    desc.textContent = `${item.descricao} — Local: ${item.local}`;

    const status = document.createElement("div");
    status.className = "status";
    status.textContent = item.reservadoPor
      ? `Reservado por ${item.reservadoPor.nome}`
      : "Disponível";

    div.append(titulo, desc, status);

    if (ehCoordenador()) {
      // Coordenador: editar / excluir
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.onclick = () => abrirFormulario(item);

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.onclick = () => excluirItem(item.id);

      div.append(btnEditar, btnExcluir);
    } else if (!item.reservadoPor) {
      // Aluno: só reservar (se ainda disponível)
      const btnReservar = document.createElement("button");
      btnReservar.textContent = "Reservar este item";
      btnReservar.onclick = () => reservarItem(item.id);
      div.append(btnReservar);
    }

    lista.append(div);
  });
}

// ===================== COORDENADOR: ADICIONAR / EDITAR =====================
$("btn-novo-item").addEventListener("click", () => abrirFormulario(null));
$("btn-cancelar").addEventListener("click", fecharFormulario);

function abrirFormulario(item) {
  if (!ehCoordenador()) return; // proteção extra

  $("form-item").classList.remove("oculto");
  $("item-id").value = item ? item.id : "";
  $("item-nome").value = item ? item.nome : "";
  $("item-descricao").value = item ? item.descricao : "";
  $("item-local").value = item ? item.local : "";
  $("item-tipo").value = item ? item.tipo : "Achado";
}

function fecharFormulario() {
  $("form-item").reset();
  $("form-item").classList.add("oculto");
}

$("form-item").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!ehCoordenador()) return;

  const id = $("item-id").value;
  const dados = {
    nome: $("item-nome").value.trim(),
    descricao: $("item-descricao").value.trim(),
    local: $("item-local").value.trim(),
    tipo: $("item-tipo").value,
  };

  if (id) {
    // editar
    const item = itens.find((i) => i.id === id);
    Object.assign(item, dados);
  } else {
    // adicionar
    itens.push({ id: crypto.randomUUID(), ...dados, reservadoPor: null });
  }

  salvarItens();
  fecharFormulario();
  renderizarItens();
});

function excluirItem(id) {
  if (!ehCoordenador()) return;
  if (!confirm("Excluir este item?")) return;
  itens = itens.filter((i) => i.id !== id);
  salvarItens();
  renderizarItens();
}

// ===================== ALUNO: RESERVAR (ENVIA E-MAIL) =====================
function reservarItem(id) {
  const item = itens.find((i) => i.id === id);
  if (!item || item.reservadoPor) return;

  const assunto = `Reserva do item: ${item.nome}`;
  const corpo =
    `Olá, coordenação!\n\n` +
    `Gostaria de reservar o item abaixo, que acredito ser meu:\n\n` +
    `Item: ${item.nome} (${item.tipo})\n` +
    `Descrição: ${item.descricao}\n` +
    `Local: ${item.local}\n\n` +
    `Aluno: ${usuario.nome}\n` +
    `E-mail institucional: ${usuario.email}\n`;

  // Marca como reservado e vincula ao aluno
  item.reservadoPor = { nome: usuario.nome, email: usuario.email };
  salvarItens();
  renderizarItens();

  // Abre o app de e-mail do aluno já preenchido
  window.location.href =
    `mailto:${EMAIL_COORDENADOR}` +
    `?subject=${encodeURIComponent(assunto)}` +
    `&body=${encodeURIComponent(corpo)}`;
}

/* ---------------------------------------------------------------
   ALTERNATIVA: envio automático (sem abrir o app de e-mail) com EmailJS
   1. Crie conta em emailjs.com e um template.
   2. Adicione no HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   3. Troque o window.location.href acima por:

   emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
     to_email: EMAIL_COORDENADOR,
     item_nome: item.nome,
     aluno_nome: usuario.nome,
     aluno_email: usuario.email,
   }, "SUA_PUBLIC_KEY");
---------------------------------------------------------------- */

// ===================== INICIALIZAÇÃO =====================
if (usuario) iniciarApp();
