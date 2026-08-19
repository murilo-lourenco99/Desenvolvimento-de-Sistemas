import { conexao } from "../conexao.js";

async function buscraCliente() {
  console.log("DAO de Cliente");

  const sql = `SELECT * FROM tbCliente;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message
  }
}
