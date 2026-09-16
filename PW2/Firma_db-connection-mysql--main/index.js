import express from "express";

import {
  buscarLimite,
  buscarLimitePorId,
} from "./DAO/LimiteDeCredito/buscarLimiteDeCredito.js";
import {
  buscarEndereco,
  buscarEnderecoPorId,
} from "./DAO/Endereco/buscarEndereco.js";
import {
  buscarClientes,
  buscarClientePorId,
  buscarClientesComDetalhes,
  buscarClienteComDetalhesPorId,
} from "./DAO/Cliente/buscarCliente.js";
import {
  buscarProdutos,
  buscarProdutoPorId,
} from "./DAO/Produtos/buscarProdutos.js";
import {
  buscarPedidos,
  buscarPedidoPorId,
  buscarPedidosDetalhados,
  buscarPedidosPorClienteId,
} from "./DAO/Pedido/buscarPedidos.js";
import {
  buscarPedidoProduto,
  buscarPedidoProdutoPorId,
} from "./DAO/Pedido_Produto/buscarPedidoProduto.js";

import { inserirLimite } from "./DAO/LimiteDeCredito/inserirLimiteDeCredito.js";
import { inserirEndereco } from "./DAO/Endereco/inserirEndereco.js";
import { inserirCliente } from "./DAO/Cliente/inserirCliente.js";
import { inserirProduto } from "./DAO/Produtos/inserirProduto.js";
import { inserirPedido } from "./DAO/Pedido/inserirPedido.js";
import { inserirPedidoProduto } from "./DAO/Pedido_Produto/inserirPedidoProduto.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API rodando yay" });
});

// INSERIR DADOS
app.post("/insert/limiteCredito", async (req, res) => {
  const { id_limite, nome } = req.body; // retirando dados do body da requisição
  let infos = [id_limite, nome];
  let results = await inserirLimite(infos);

  console.log(results);
  res.json(results);
});

app.post("/insert/endereco", async (req, res) => {
  const { id_endereco, logradouro, numero, cep, cidade } = req.body;
  let infos = [id_endereco, logradouro, numero, cep, cidade];
  let results = await inserirEndereco(infos);

  console.log(results);
  res.json(results);
});

app.post("/insert/cliente", async (req, res) => {
  const { codigo, nome, sobreNome, cpf, telefone, id_limite, id_endereco } =
    req.body;
  let infos = [codigo, nome, sobreNome, cpf, telefone, id_limite, id_endereco];
  let results = await inserirCliente(infos);

  console.log(results);
  res.json(results);
});

app.post("/insert/produto", async (req, res) => {
  const { codigo, nome, descricao, preco } = req.body;
  let infos = [codigo, nome, descricao, preco];
  let results = await inserirProduto(infos);

  console.log(results);
  res.json(results);
});

app.post("/insert/pedido", async (req, res) => {
  const { numero, data_elaboracao, id_cliente } = req.body;
  let infos = [numero, data_elaboracao, id_cliente];
  let results = await inserirPedido(infos);

  console.log(results);
  res.json(results);
});

app.post("/insert/pedido_produto", async (req, res) => {
  const { id_pedido, id_produto } = req.body;
  let infos = [id_pedido, id_produto];
  let results = await inserirPedidoProduto(infos);

  console.log(results);
  res.json(results);
});

// CONSULTAS

// LIMITE DE CRÉDITO
app.get("/limiteCredito", async (req, res) => {
  try {
    const limiteCredito = await buscarLimite();
    res.json(limiteCredito);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar limites",
      detalhes: error.message,
    });
  }
});

app.get("/limiteCredito/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const limiteCredito = await buscarLimitePorId(id);

    if (!limiteCredito) {
      return res.status(404).json({
        error: "Limite não encontrado",
      });
    }

    res.json(limiteCredito);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar Limite",
      detalhes: error.message,
    });
  }
});

// ENDEREÇO
app.get("/endereco", async (req, res) => {
  try {
    const endereco = await buscarEndereco(); // requisição
    res.json(endereco); // resposta
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar endereços",
      detalhes: error.message,
    });
  }
});

app.get("/endereco/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const endereco = await buscarEnderecoPorId(id);
    if (!endereco) {
      return res.status(404).json({
        error: "Endereço não encontrado",
      });
    }
    res.json(endereco);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar endereço",
      detalhes: error.message,
    });
  }
});

// CLIENTE
app.get("/clientes", async (req, res) => {
  try {
    const clientes = await buscarClientes(); // requisição
    res.json(clientes); // resposta
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar clientes",
      detalhes: error.message,
    });
  }
});

app.get("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await buscarClientePorId(id);
    if (!cliente) {
      return res.status(404).json({
        error: "Cliente não encontrado",
      });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar cliente",
      detalhes: error.message,
    });
  }
});

// PRODUTOS
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await buscarProdutos(); // requisição
    res.json(produtos); // resposta
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar produtos",
      detalhes: error.message,
    });
  }
});

app.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await buscarProdutoPorId(id);
    if (!produto) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar produto",
      detalhes: error.message,
    });
  }
});

// PEDIDOS
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await buscarPedidos(); // requisição
    res.json(pedidos); // resposta
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar pedidos",
      detalhes: error.message,
    });
  }
});

app.get("/pedidos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await buscarPedidoPorId(id);
    if (!pedido) {
      return res.status(404).json({
        error: "Pedido não encontrado",
      });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar pedido",
      detalhes: error.message,
    });
  }
});

// PEDIDO_PRODUTO
app.get("/pedido_produtos", async (req, res) => {
  try {
    const pedidoProdutos = await buscarPedidoProduto(); // requisição
    res.json(pedidoProdutos); // resposta
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar pedido_produtos",
      detalhes: error.message,
    });
  }
});

app.get("/pedido_produto/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoProduto = await buscarPedidoProdutoPorId(id);
    if (!pedidoProduto) {
      return res.status(404).json({
        error: "PedidoProduto não encontrado",
      });
    }
    res.json(pedidoProduto);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar pedido_produto",
      detalhes: error.message,
    });
  }
});

// VIEWS

// VIEW 1: PEDIDOS DETALHADOS
app.get("/pedidos-detalhados", async (req, res) => {
  try {
    const pedidosDetalhados = await buscarPedidosDetalhados();
    res.json(pedidosDetalhados);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar pedidos detalhados",
      detalhes: error.message,
    });
  }
});

app.get("/pedidos-detalhados/cliente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pedidosDoCliente = await buscarPedidosPorClienteId(id);

    if (!pedidosDoCliente || pedidosDoCliente.length === 0) {
      return res.status(404).json({
        error: "Nenhum pedido encontrado para este cliente",
      });
    }

    res.json(pedidosDoCliente);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar pedidos do cliente",
      detalhes: error.message,
    });
  }
});

// VIEW 2: CLIENTES COM DETALHES (Endereço e Limite de Crédito)
app.get("/clientes-detalhados", async (req, res) => {
  try {
    const clientesDetalhados = await buscarClientesComDetalhes();
    res.json(clientesDetalhados);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar clientes detalhados",
      detalhes: error.message,
    });
  }
});

app.get("/clientes-detalhados/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clienteDetalhado = await buscarClienteComDetalhesPorId(id);

    if (!clienteDetalhado) {
      return res.status(404).json({
        error: "Cliente não encontrado nos detalhes",
      });
    }

    res.json(clienteDetalhado);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar detalhes do cliente",
      detalhes: error.message,
    });
  }
});

// Inicialização do Servidor
app.listen(3000, () => {
  console.log("*** Servidor rodando em -> http://localhost:3000 ***");
});
