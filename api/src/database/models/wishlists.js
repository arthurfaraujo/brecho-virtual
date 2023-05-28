import database from '../js/database.js';

async function create(desejo) {
    const db = await database.connect();

    const query = `insert into lista_desejo (cod_usr, cod_pec) 
    values (?, ?);`;

    const { cod_usr, cod_pec } = desejo;

    const { lastID } = db.run(query, [cod_usr, cod_pec]);
    
    return lastID;
}

async function read(desejo) {
    const db = await database.connect();

    const query = `select * from lista_desejo
    where cod_usr = ? and
    where cod_pec = ?;`;

    const { cod_usr, cod_pec } = desejo;

    const des = await db.get(query, [cod_usr, cod_pec]);

    return des;
}

async function readAllU(desejo) {
    const db = await database.connect();

    const query = `select * from lista_desejo
    where cod_usr = ?;`;

    const { cod_usr } = desejo;

    const des = await db.all(query, [cod_usr]);

    return des;
}

export default { create, read, readAllU };