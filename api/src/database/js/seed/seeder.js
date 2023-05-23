// imports necessários para popular o banco
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

async function up() {
    const seeds = JSON.parse(readFileSync(resolve('src', 'database', 'js', 'seed', 'seeds.json')));

    // loops para popular
}

export default { up };