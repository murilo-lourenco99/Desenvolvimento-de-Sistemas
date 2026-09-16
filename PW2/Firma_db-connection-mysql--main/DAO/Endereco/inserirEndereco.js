import { conexao } from "../conexao.js";

async function inserirEndereco(infos) {
    const data = [infos]
    const sql =
        `INSERT INTO Endereco (id_endereco, logradouro, numero, cep, cidade) VALUES ?;`
    const conn = await conexao()

    try {
        const [rows] = await conn.query(sql, [data]);
        await conn.end();
        return rows;
    } catch (error) {
        throw error;
    }
}

export { inserirEndereco };