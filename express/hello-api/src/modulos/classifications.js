import database from '../database/database.js';

export async function create(classif) {
    const db = await database.connect();

    const request = `insert into classificacao values (?, ?, ?)`;

    const { lastID } = await db.run(request, classif);

    return lastID;
}

// TODO: Criar as funções de leitura
// TODO: Criar as classificações para criar as peças

export default create;