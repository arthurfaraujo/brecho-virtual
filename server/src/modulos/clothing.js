import database from '../database/js/database.js';

export async function create(cloth) {
    const db = await database.connect();

    const query = `insert into peca values (?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?);`;

    const { cod_pec, descricao, estado_uso,
    preco, nome, cod_usr_cp, data_compra, cod_dep, 
    cod_cat, cod_sub, cod_mar, cod_usr_cr } = cloth;

    const { lastID } = await db.run(query, [cod_pec, descricao, estado_uso,
    preco, nome, cod_usr_cp, data_compra, cod_dep, 
    cod_cat, cod_sub, cod_mar, cod_usr_cr]);

    return lastID;
}

export async function read(cod_pec) {
    const db = await database.connect();

    const query = `select * from peca
    where cod_pec = ?;`;

    const cloth = await db.get(query, [cod_pec]);

    return cloth;
}

export async function readAll() {
    const db = await database.connect();

    const query = `select * from peca;`;

    const clothing = await db.all(query);

    return clothing;
}

export default { create, read, readAll };