import database from '../js/database.js';


async function create(cod_pec, caminho) {
    const db = await database.connect();

    const query = `insert into foto_produto values (?, ?);`;

    const { lastID } = await db.run(query, [cod_pec, caminho]);

    return lastID;
}

async function remove() {
    const db = await database.connect();

    const query = `delete from foto_produto 
    where cod_pec = ?;`;

    const { changes } = db.run(query, [cod_pec]);

    return changes;
};

export default { create, remove };