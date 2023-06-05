import database from '../js/database.js';


async function create(foto_produto) {
    const db = await database.connect();

    const query = `insert into foto_produto values (?, ?);`;

    const { cod_pec, url_img } = foto_produto;

    const { lastID } = await db.run(query, [cod_pec, url_img]);

    return lastID;
}

async function readU(cod_pec) {
    const db = await database.connect();

    const query = `select url_img from foto_produto
    where cod_pec = ?;`;

    const codP = await db.all(query, [cod_pec]);

    return codP;
}

async function remove(cod_pec) {
    const db = await database.connect();

    const query = `delete from foto_produto 
    where cod_pec = ?;`;

    const { changes } = db.run(query, [cod_pec]);

    return changes;
};

async function readAll() {
    const db = await database.connect();

    const query = `select * from foto_produto;`;

    const codP = await db.all(query);

    return codP;
}

export default { create, remove, readU, readAll };