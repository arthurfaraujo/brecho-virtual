import migration from './migration.js';
import seeder from './seed/seeder.js';

async function up() {
    await migration.up();
    await seeder.up();
}

up();