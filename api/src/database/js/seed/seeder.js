// imports necessários para popular o banco
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import users from '../../models/users.js';
import brands from '../../models/brands.js';
import departments from '../../models/departments.js';
import categories from '../../models/categories.js';
import subcategories from '../../models/subcategories.js';
import classifications from '../../models/classifications.js';

async function up() {
    const seeds = JSON.parse(readFileSync(resolve(process.cwd(), 'src', 'database', 'js', 'seed', 'seeds.json')));

    for (const usuario of seeds.usuarios) {
        users.create(usuario);
    }

    for (const marca of seeds.marcas) {
        brands.create(marca);
    }

    for (const departamento of seeds.departamentos) {
        departments.create(departamento);
    }

    for (const categoria of seeds.categorias) {
        categories.create(categoria);
    }

    for (const subcategoria of seeds.subcategorias) {
        subcategories.create(subcategoria);
    }

    for (const classificacao of seeds.classificacoes) {
        await classifications.create(classificacao);
    }

}

export default { up };