import { conexao } from "../conexao.js";

async function buscarPedidos() {
  console.log("DAO de pedidos");

  const sql = `SELECT * FROM Pedido;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function buscarPedidoPorId(id) {
  const sql = `SELECT * FROM Pedido WHERE numero = ?;`;
  const conn = await conexao();
  try {
    const [rows] = await conn.query(sql, [id]);
    await conn.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
}


async function buscarPedidosDetalhados() {
    console.log("DAO - Buscando VIEW de Pedidos");

    const sql = `select * from vw_pedidos_detalhados;`;
    const conn = await conexao();

    try {
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (error) {
        return error.message;
    }
}

async function buscarPedidosPorClienteId(idCliente) {
    const sql = `SELECT * FROM vw_pedidos_detalhados WHERE id_cliente = ?;`;
    const conn = await conexao();

    try {
        const [rows] = await conn.query(sql, [idCliente]);
        await conn.end();
        return rows;
    } catch (error) {
        throw error;
    }
}

export { buscarPedidos, buscarPedidoPorId, buscarPedidosDetalhados, buscarPedidosPorClienteId };