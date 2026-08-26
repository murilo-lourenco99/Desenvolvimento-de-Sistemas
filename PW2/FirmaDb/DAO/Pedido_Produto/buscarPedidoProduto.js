import { conexao } from "../conexao.js";

async function buscarPedidoProduto() {
  console.log("DAO de Produtos_pedidos");

  const sql = `SELECT * FROM Pedido_Produto;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function buscarPedidoProdutoPorId(id) {
  const sql = `SELECT * FROM Pedido_Produto WHERE id_pedido_produto = ?;`;
  const conn = await conexao();
  try {
    const [rows] = await conn.query(sql, [id]);
    await conn.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export { buscarPedidoProduto, buscarPedidoProdutoPorId };
