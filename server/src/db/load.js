import migration from './migration.js';
import seed from './seed/seeder.js';

async function load() {
    await migration();
    await seed();
}

load();