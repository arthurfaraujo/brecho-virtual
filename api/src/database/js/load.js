import migration from './migration.js';

async function up() {
    await migration.up();
}

up();