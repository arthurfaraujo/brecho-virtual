import database from '../database/database.js';

export async function create(user) {
    const db = await database.connect();

    const { cod_usr, email, senha, nome, telefone, 
    UF:uf, cidade, rua, 'número':numero } = user;

    const request = `
    insert into usuario values 
    (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const { lastID } = await db.run(request, [cod_usr, 
    email, senha, nome, telefone, uf, cidade, rua, numero]);

    return lastID;
}

export async function read(id) {
    const db = await database.connect();

    const request = `select * from usuario where cod_usr = ?`;

    const usuario = await db.get(request, [id]);

    return usuario;
}

export async function readAll() {
    const db = await database.connect();

    const request = `select * from classificacao;`;

    const usuarios = await db.all(request);

    return usuarios;
}

export default { read, create };