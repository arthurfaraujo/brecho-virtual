import database from '../database/database.js';

async function readAll() {
    const db = await database.connect();

    const request = `select * from marca;`;

    const marcas = await db.all(request);

    return marcas;
}