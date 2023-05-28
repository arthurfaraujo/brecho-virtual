import database from '../js/database.js';

async function create(peca) {
    const db = await database.connect();

    const query = `insert into peca (descricao, estado_uso, preco, 
    nome, cod_usr_cp, cod_cla, cod_mar, cod_usr_cr, data_compra) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const { descricao, estado_uso, preco, nome, cod_usr_cp,
    cod_cla, cod_mar, cod_usr_cr, data_compra } = peca;

    const { lastID } = await db.run(query, [descricao, estado_uso, 
    preco, nome, cod_usr_cp, cod_cla, cod_mar, cod_usr_cr, data_compra]);

    return lastID;
}

async function read(cod_pec) {
    const db = await database.connect();

    const query = `select * from peca
    where cod_pec = ?;`;

    const peca = await db.get(query, [cod_pec]);

    return peca;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from peca;`;

    const pecas = await db.all(query);

    return pecas;
}

export default { create, read, readAll };