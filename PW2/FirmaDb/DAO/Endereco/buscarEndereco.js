import { conexao } from "../conexao.js";

async function buscarEndereco() {
  console.log("DAO de Endereço");

  const sql = `SELECT * FROM Endereco;`;
  const conn = await conexao();

  try {
    const [rows, fields] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    return error.message;
  }
}

async function buscarEnderecoPorId(id) {
  const sql = `SELECT * FROM Endereco WHERE id_endereco = ?;`;
  const conn = await conexao();
  try {
    const [rows] = await conn.query(sql, [id]);
    await conn.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export { buscarEndereco, buscarEnderecoPorId };
