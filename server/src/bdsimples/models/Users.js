import database from '../database.js';

async function createU(user) {
    const db = await database.connect();

    const query = `insert into user values (?, ?, ?);`;

    const { id, nome, senha } = user;

    const { lastID } = await db.run(query, [id, nome, senha]);

    return lastID;
}

async function rAllU() {
    const db = await database.connect()

    const query = `select * from user;`;

    const users = await db.all(query);

    return users;
}

async function rU(id) {
    const db = await database.connect()

    const query = `select * from user where id = ?;`;

    const user = await db.get(query, [id]);

    return user;
}

async function dU(id) {
    const db = await database.connect()

    const query = `delete from user where id = ?;`;

    const { changes } = await db.run(query, [id]);

    return changes;
}

export default { createU, rU, rAllU, dU }