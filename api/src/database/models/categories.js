import database from "../js/database.js";

async function create(categoria) {
    const db = await database.connect();

    const query = `insert into categoria (cat) values (?)`;

    const { nome } = categoria;

    const { lastID } = await db.run(query, [nome]);

    return lastID;
}

async function read(categoria) {
    const db = await database.connect();

    const query = `select * from categoria
    where cod_cat = ?;`;

    const dep = await db.get(query, [categoria]);

    return dep;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from categoria;`;

    const deps = await db.all(query);

    return deps;
}

export default { create, read, readAll };