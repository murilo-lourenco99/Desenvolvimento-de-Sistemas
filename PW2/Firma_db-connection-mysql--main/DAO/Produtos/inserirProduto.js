import { conexao } from "../conexao.js";

async function inserirProduto(infos) {
  const data = [infos];
  const sql = `INSERT INTO Produto (codigo, nome, descricao, preco) VALUES ?;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql, [data]);
    await conn.end();
    return rows;
  } catch (error) {
    throw error;
  }
}

export { inserirProduto };
