import { Database } from 'sqlite-async';
import { resolve } from 'path';

const db = resolve(process.cwd(), 'src', 'database', 'db.db');

async function connect() {
    return await Database.open(db);
}

export default { connect };