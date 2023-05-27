// imports necessários para popular o banco
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import users from '../../models/users.js';
import brands from '../../models/brands.js';

async function up() {
    const seeds = JSON.parse(readFileSync(resolve(process.cwd(), 'src', 'database', 'js', 'seed', 'seeds.json')));

    for (const usuario of seeds.usuarios) {
        users.create(usuario);
    }

    for (const marca of seeds.marcas) {
        brands.create(marca);
    }

    // for (const departamento of seeds.departamentos) {
    //     console.log(departamento);
    // }

    // for (const categoria of seeds.categorias) {
    //     console.log(categoria);
    // }

    // for (const subcategoria of seeds.subcategorias) {
    //     console.log(subcategoria);
    // }

    // for (const classificacao of seeds.classificacoes) {
    //     console.log(classificacao);
    // }
}

export default { up };