import database from '../database/database.js';

export async function readAll() {
    const db = await database.connect();

    const request = `select * from marca;`;

    const marcas = await db.all(request);

    return marcas;
}

async function create(name) {
    const db = await database.connect();

    const request = `insert into marca (nome) values (?);`;

    const { lastID } = await db.run(request, [name]);

    return lastID;
}

export async function read(codigo) {
    const db = await database.connect();

    const request = `select * from marca
    where cod_mar = ?;`;

    const marcas = await db.get(request, [codigo]);

    return marcas;
}

export default { read, readAll }