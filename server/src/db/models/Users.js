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

async function readName(name) {
    const db = await database.connect()

    const query = `select * from user where name = ?;`;

    const user = await db.get(query, [name]);

    return user;
}

async function remove(id) {
    const db = await database.connect()

    const query = `delete from user where id = ?;`;

    const { changes } = await db.run(query, [id]);

    return changes;
}

async function auth(dados) {
    const usr = await readName(dados.nome);
    if (usr) {
        if (dados.senha === usr.password) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

export default { create, read, readName, rAll, remove, auth };