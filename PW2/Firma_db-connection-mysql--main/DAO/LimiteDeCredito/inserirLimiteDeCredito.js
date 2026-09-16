import { conexao } from "../conexao.js";

async function inserirLimite(infos) {
    const data = [infos]
    const sql =
        `INSERT INTO LimiteDeCredito (id_limite, nome) VALUES ?;`
    const conn = await conexao()

    try {
        const [rows] = await conn.query(sql, [data]);
        await conn.end();
        return rows;
    } catch (error) {
        throw error;
    }
}

export { inserirLimite };