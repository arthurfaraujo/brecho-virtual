import database from '../js/database.js';


async function create(foto_produto) {
    const db = await database.connect();

    const query = `insert into foto_produto values (?, ?);`;

    const { cod_pec, url_img } = foto_produto;

    const { lastID } = await db.run(query, [cod_pec, url_img]);

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