import { conexao } from "../conexao.js";

async function buscarUsuarios() {
  console.log("DAO de Usuarios");

  const sql = `SELECT * FROM Usuario;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function buscarUsuarioPorNome(nome) {
  console.log("DAO de Usuarios");

  const sql = `SELECT nome FROM Usuario WHERE nome LIKE ?;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

export { buscarUsuarioPorNome }