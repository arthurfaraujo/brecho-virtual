import database from '../database.js';

async function create(user) {
    const db = await database.connect();

    const query = `insert into user (name, password) values (?, ?);`;

    const { nome, senha } = user;

    const { lastID } = await db.run(query, [nome, senha]);

    return lastID;
}

async function rAll() {
    const db = await database.connect()

    const query = `select * from user;`;

    const users = await db.all(query);

    return users;
}

async function read(id) {
    const db = await database.connect()

    const query = `select * from user where id = ?;`;

    const user = await db.get(query, [id]);

    return user;
}

async function remove(id) {
    const db = await database.connect()

    const query = `delete from user where id = ?;`;

    const { changes } = await db.run(query, [id]);

    return changes;
}

export default { create, read, rAll, remove };