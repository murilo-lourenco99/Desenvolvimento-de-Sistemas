import { conexao } from "../conexao.js";

async function inserirCliente(infos) {
  const data = [infos];
  const sql = `INSERT INTO Cliente (codigo, nome, sobreNome, cpf, telefone, id_limite, id_endereco) VALUES ?;`;
  const conn = await conexao();

  try {
    const [rows] = await conn.query(sql, [data]);
    await conn.end();
    return rows;
  } catch (error) {
    throw error;
  }
}

export { inserirCliente };
