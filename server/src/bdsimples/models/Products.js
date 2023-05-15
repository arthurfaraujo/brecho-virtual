import database from '../database.js';

async function createP(product) {
    const db = await database.connect()

    const query = `insert into product values (?, ?, ?, ?, ?);`;

    const { id, nome, 'preço':price, imagem, categoria } = product;

    const { lastID } = await db.run(query, [id, nome, price, imagem, categoria]);

    return lastID;
}

async function rAllP() {
    const db = await database.connect();

    const query = `select * from product;`;

    const products = await db.all(query);

    return products;
}

async function rP(id) {
    const db = await database.connect()

    const query = `select * from product where id = ?;`;

    const products = await db.get(query, [id]);

    return products;
}

async function dP(id) {
    const db = await database.connect()

    const query = `delete from product where id = ?;`;

    const { changes } = await db.run(query, [id]);

    return changes;
}

export default { createP, rP, rAllP, dP };