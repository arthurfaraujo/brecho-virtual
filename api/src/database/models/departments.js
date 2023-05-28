import database from "../js/database.js";

async function create(departamento) {
    const db = await database.connect();

    const query = `insert into departamento (nome) values (?)`;

    const { nome } = departamento;

    const { lastID } = await db.run(query, [nome]);

    return lastID;
}

async function read(departamento) {
    const db = await database.connect();

    const query = `select * from departamento
    where cod_dep = ?;`;

    const dep = await db.get(query, [departamento]);

    return dep;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from departamento;`;

    const deps = await db.all(query);

    return deps;
}

export default { create, read, readAll };