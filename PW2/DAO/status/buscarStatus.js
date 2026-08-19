import { conexao } from "../conexao.js";

async function buscarStatus() {
  console.log("DAO de Satus");

  const sql = `SELECT * FROM tbStatus;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function buscarStatusId(id) {
  console.log("DAO de Satus por id");

  const sql = `SELECT * FROM tbStatus WHERE idStatus = ?;`;
  const conn = await conexao();

  try {
    //consulta
    const [rows, fields] = await conn.query(sql, [id]);
    await conn.end();
    return rows;
  } catch (erro) {
    return erro.message;
  }
}

export { buscarStatus, buscarStatusId };