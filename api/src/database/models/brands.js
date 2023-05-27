import database from '../js/database.js';

async function create(marca) {
    const db = await database.connect();

    const query = `insert into marca (nome) values (?);`;

    const { nome } = marca;

    const { lastID } = await db.run(query, [nome]);

    return lastID;
}

async function read(cod_mar) {
    const db = await database.connect();

    const query = `select * from marca
    where cod_mar = ?;`;

    const brands = await db.get(query, [cod_mar]);

    return brands;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from marca;`;

    const brands = await db.all(query);

    return brands;
}

export default { create, read, readAll }