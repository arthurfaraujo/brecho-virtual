import { Database } from 'sqlite-async';
import { resolve } from 'path';

const dbpath = resolve(process.cwd(), 'src', 'bdsimples', 'db.sqlite');

async function connect() {
    return await Database.open(dbpath);
}

export default { connect }