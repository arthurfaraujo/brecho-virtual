import database from '../database/database.js';

async function readAll() {
    const db = await database.connect();

    const sql = `select * from marca;`;

    const marcas = await db.all(sql);

    return marcas;
}