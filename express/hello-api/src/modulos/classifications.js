import database from '../database/database.js';

export async function create(classif) {
    const db = await database.connect();

    const request = `insert into classificacao values (?, ?, ?)`;

    const { lastID } = await db.run(request, classif);

    return lastID;
}

create([1, 2, 3]);

export default create;