import { PSDB } from 'planetscale-node';
const conn = new PSDB('main')
  
export default async function handler(req, res) {
    const {
        query: { contenido },
        method
    } = req

    const [rows, fields] = await conn.query(`insert into comentarios(contenido) values ('${contenido}')`)
    res.send(rows);
}