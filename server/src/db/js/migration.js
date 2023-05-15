import database from './database.js';

async function up() {
    const db = await database.connect();

    const productCreate = `
    CREATE TABLE product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        price NUMERIC(8,2),
        img VARCHAR(100),
        category VARCHAR(40)
    );`
    
    await db.run(productCreate);

    const userCreate = `
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(150) UNIQUE,
        password CHAR(8)
    );`

    await db.run(userCreate);
}

export default { up };