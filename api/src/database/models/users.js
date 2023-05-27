import database from '../js/database.js';

// função de criação de usuário
async function create(user) {
    const db = await database.connect();

    const { email, senha, nome, telefone, 
    uf, cidade, rua, numero } = user;

    const query = `
    insert into usuario (e_mail, senha, nome, telefone, 
    uf, cidade, rua, numero) values (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const { lastID } = await db.run(query, [email,  nome, telefone, 
    uf, cidade, rua, numero]);

    return lastID;
}

async function read(cod_usr) {
    const db = await database.connect();

    const query = `select * from usuario where cod_usr = ?`;

    const usuario = await db.get(query, [cod_usr]);

    return usuario;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from usuario;`;

    const usuarios = await db.all(query);

    return usuarios;
}

export default { create, read, readAll };