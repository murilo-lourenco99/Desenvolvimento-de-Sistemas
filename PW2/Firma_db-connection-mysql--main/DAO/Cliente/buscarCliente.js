import { conexao } from "../conexao.js";

async function buscarClientes() {
    console.log("DAO de CLiente");

    const sql = `SELECT * FROM Cliente;`;
    const conn = await conexao();

    try {
        const [rows, fields] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (error) {
        return error.message
    }
}

async function buscarClientePorId(id) {
  const sql = `SELECT * FROM Cliente WHERE codigo = ?;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql, [id]);
    await conn.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function buscarClientesComDetalhes() {
    console.log("DAO - Buscando VIEW de Clientes");

    const sql = `SELECT * FROM vw_cliente_detalhes;`;
    const conn = await conexao();

    try {
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    } catch (error) {
        return error.message;
    }
}

async function buscarClienteComDetalhesPorId(id) {
    const sql = `SELECT * FROM vw_cliente_detalhes WHERE id_cliente = ?;`;
    const conn = await conexao();

    try {
        const [rows] = await conn.query(sql, [id]);
        await conn.end();
        return rows[0];
    } catch (error) {
        throw error;
    }
}


export { buscarClientes, buscarClientePorId, buscarClientesComDetalhes , buscarClienteComDetalhesPorId };