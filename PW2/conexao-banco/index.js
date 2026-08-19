import express from "express";

import { buscarStatus, buscarStatusId } from "./DAO/status/buscarStatus.js";
import { buscarClientes } from "./DAO/cliente/buscarCliente.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API rodando yay" });
});

// CONSULTAS

// clientes
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

// status
app.get("/status", async (req, res) => {
  try {
    const status = await buscarStatus(); // requisição
    res.json(status); // resposta
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar status",
      detalhes: error.message,
    });
  }
});


// Inicialização do Servidor
app.listen(3000, () => {
  console.log("Servidor rodando em -> http://localhost:3000");
});
