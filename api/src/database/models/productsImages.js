import database from '../js/database.js';


async function create(cod_pec, caminho) {
    const db = await database.connect();

    const query = `insert into foto_produto values (?, ?);`;

    const { lastID } = await db.run(query, [cod_pec, caminho]);

    return lastID;
}

export default { create };