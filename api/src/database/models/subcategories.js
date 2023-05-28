import database from "../js/database.js";

async function create(subcategoria) {
    const db = await database.connect();

    const query = `insert into subcategoria (sub) values (?)`;

    const { nome } = subcategoria;

    const { lastID } = await db.run(query, [nome]);

    return lastID;
}

async function read(subcategoria) {
    const db = await database.connect();

    const query = `select * from subcategoria
    where cod_sub = ?;`;

    const sub = await db.get(query, [subcategoria]);

    return sub;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from subcategoria;`;

    const subs = await db.all(query);

    return subs;
}

export default { create, read, readAll };