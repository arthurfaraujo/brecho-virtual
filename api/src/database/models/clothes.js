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

async function readCod(peca) {
    const db = await database.connect();

    const query = `select cod_pec from peca
    where descricao = ? and estado_uso = ? 
    and preco = ? and nome = ? 
    and cod_usr_cp = ? and
    cod_cla = ? and cod_mar = ? 
    and cod_usr_cr = ? and data_compra = ?;`;

    const { descricao, estado_uso, preco, nome, cod_usr_cp,
        cod_cla, cod_mar, cod_usr_cr, data_compra } = peca;

    const pec = await db.get(query, [descricao, estado_uso, preco, nome, cod_usr_cp,
        cod_cla, cod_mar, cod_usr_cr, data_compra]);

    return pec;
}

async function readAll() {
    const db = await database.connect();

    const query = `select * from peca;`;

    const pecas = await db.all(query);

    return pecas;
}

async function remove(cod_pec) {
    const db = await database.connect();

    const query = `delete from peca 
    where cod_pec = ?;`;

    const { changes } = db.run(query, [cod_pec]);

    return changes;
}

export default { create, read, readAll, readCod, remove };