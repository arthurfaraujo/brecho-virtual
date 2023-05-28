// imports necessários para popular o banco
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import users from '../../models/users.js';
import brands from '../../models/brands.js';
import departments from '../../models/departments.js';
import categories from '../../models/categories.js';
import subcategories from '../../models/subcategories.js';
import classifications from '../../models/classifications.js';
import clothes from '../../models/clothes.js';
import wishlists from '../../models/wishlists.js';

async function up() {
    const seeds = JSON.parse(readFileSync(resolve(process.cwd(), 'src', 'database', 'js', 'seed', 'seeds.json')));

    for (const usuario of seeds.usuarios) {
        await users.create(usuario);
    }

    for (const marca of seeds.marcas) {
        await brands.create(marca);
    }

    for (const departamento of seeds.departamentos) {
        await departments.create(departamento);
    }

    for (const categoria of seeds.categorias) {
        await categories.create(categoria);
    }

    for (const subcategoria of seeds.subcategorias) {
        await subcategories.create(subcategoria);
    }

    for (const classificacao of seeds.classificacoes) {
        await classifications.create(classificacao);
    }

    for (const peca of seeds.pecas) {
        await clothes.create(peca);
    }

    for (const desejo of seeds.listas_desejo) {
        await wishlists.create(desejo);
    }
}

export default { up };