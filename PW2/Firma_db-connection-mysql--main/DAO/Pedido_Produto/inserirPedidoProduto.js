import { conexao } from "../conexao.js";

async function inserirPedidoProduto(infos) {
  const data = [infos];
  const sql = `INSERT INTO Pedido_Produto (id_pedido, id_produto) VALUES ?;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql, [data]);
    await conn.end();
    return rows;
  } catch (error) {
    throw error;
  }
}

export { inserirPedidoProduto };
