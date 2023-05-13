import database from '../database/database.js';

// função de criação de usuário
export async function create(user) {
    const db = await database.connect();

    const { cod_usr, email, senha, nome, telefone, 
    uf, cidade, rua, numero } = user;

    const query = `
    insert into usuario values 
    (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const { lastID } = await db.run(query, [cod_usr, 
    email, senha, nome, telefone, uf, cidade, rua, numero]);

    return lastID;
}

export async function read(cod_usr) {
    const db = await database.connect();

    const query = `select * from usuario where cod_usr = ?`;

    const usuario = await db.get(query, [cod_usr]);

    return usuario;
}

export async function readAll() {
    const db = await database.connect();

    const query = `select * from usuario;`;

    const usuarios = await db.all(query);

    return usuarios;
}

export default { create, read, readAll };