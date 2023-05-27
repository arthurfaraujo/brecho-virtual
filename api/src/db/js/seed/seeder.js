import product from '../../models/Products.js';
import user from '../../models/Users.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

async function up() {
    const seeds = JSON.parse(readFileSync(resolve(process.cwd(), 'src', 'db', 'js', 'seed', 'seeds.json')));

    for (const seed of seeds.products) {
        await product.create(seed);
    }

    for (const seed of seeds.users) {
        await user.create(seed);
    }
}

export default { up };