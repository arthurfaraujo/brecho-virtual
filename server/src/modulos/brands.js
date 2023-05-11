import database from '../database/database.js';

async function create(name) {
    const db = await database.connect();

    const query = `insert into marca (nome) values (?);`;

    const { lastID } = await db.run(query, [name]);

    return lastID;
}

export async function read(codigo) {
    const db = await database.connect();

    const query = `select * from marca
    where cod_mar = ?;`;

    const brands = await db.get(query, [codigo]);

    return brands;
}

export async function readAll() {
    const db = await database.connect();

    const query = `select * from marca;`;

    const brands = await db.all(query);

    return brands;
}

export default { read, readAll }