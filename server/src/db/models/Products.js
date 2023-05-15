import database from '../js/database.js';

async function create(product) {
    const db = await database.connect()

    const query = `insert into product (name, price, img, category) values (?, ?, ?, ?);`;

    const { nome, 'preço':price, imagem, categoria } = product;

    const { lastID } = await db.run(query, [nome, price, imagem, categoria]);

    return lastID;
}

async function rAll() {
    const db = await database.connect();

    const query = `select * from product;`;

    const products = await db.all(query);

    return products;
}

async function read(id) {
    const db = await database.connect()

    const query = `select * from product where id = ?;`;

    const products = await db.get(query, [id]);

    return products;
}

async function remove(id) {
    const db = await database.connect()

    const query = `delete from product where id = ?;`;

    const { changes } = await db.run(query, [id]);

    return changes;
}

export default { create, read, rAll, remove };