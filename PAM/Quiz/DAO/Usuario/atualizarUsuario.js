import { conexao } from '../conexao.js'

async function atualizarUSuario(codigo, infos) {

    const sql = `UPDATE Usuario SET part_favorita = ? WHERE id_usuario = ${codigo} ;`
    const conn = await conexao()

    try {
        // Executar a consulta
        const [results] = await conn.query(sql, [...infos]);

        await conn.end()
        return results
    } catch (err) {
        return err.message
    }
}

export { atualizarUSuario }
