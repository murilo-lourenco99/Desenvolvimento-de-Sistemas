import { conexao } from "../conexao.js";

async function inserirPedido(infos) {
  const data = [infos];
  const sql = `INSERT INTO Pedido (numero, data_elaboracao, id_cliente) VALUES ?;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql, [data]);
    await conn.end();
    return rows;
  } catch (error) {
    throw error;
  }
}

export { inserirPedido };
