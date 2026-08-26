import { conexao } from "../conexao.js";

async function buscarLimite() {
  const sql = `SELECT * FROM LimiteDeCredito;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql);
    await conn.end();
    return rows;
  } catch (error) {
    throw error;
  }
}

async function buscarLimitePorId(id) {
  const sql = `SELECT * FROM LimiteDeCredito WHERE id_limite = ?;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql, [id]);
    await conn.end();
    return rows[0];
  } catch (error) {
    throw error;
  }
}

export { buscarLimite, buscarLimitePorId };
