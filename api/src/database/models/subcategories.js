import database from "../js/database.js";

async function create(subcategoria) {
    const db = await database.connect();

    const query = `insert into subcategoria (nome) values (?)`;

    const { nome } = subcategoria;

    const { lastID } = await db.run(query, [nome]);

    return lastID;
}

async function read(subcategoria) {
    const db = await database.connect();

    const query = `select * from subcategoria
    where cod_sub = ?;`;

    const dep = await db.get(query, [subcategoria]);

    return dep;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from subcategoria;`;

    const deps = await db.all(query);

    return deps;
}

export default { create, read, readAll };