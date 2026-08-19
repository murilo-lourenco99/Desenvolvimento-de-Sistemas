import express from "express";

import { buscarStatus, buscarStatusId } from "./DAO/status/buscarStatus.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API rodando yay" });
});

// CONSULTAS

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

// status por ID
app.get("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await buscarStatusId(id);
    if (!status) {
      return res.status(404).json({ error: "Status não encontrado" });
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar status",
      detalhes: erro.message,
    });
  }
});

// clientes


// Inicialização do Servidor
app.listen(3000, () => {
  console.log("Servidor rodando em -> http://localhost:3000");
});
