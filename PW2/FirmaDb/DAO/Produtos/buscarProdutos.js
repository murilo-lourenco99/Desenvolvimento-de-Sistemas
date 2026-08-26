import { conexao } from "../conexao.js";

async function buscarProdutos() {
  console.log("DAO de produtos");

  const sql = `SELECT * FROM Produto;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function buscarProdutoPorId(id) {
  const sql = `SELECT * FROM Produto WHERE id_produto = ?;`;
  const conn = await conexao();
  try {
    const [rows] = await conn.query(sql, [id]);
    await conn.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export { buscarProdutos, buscarProdutoPorId };
