import database from '../database/database.js';

export async function create(classif) {
    const db = await database.connect();

    const request = `insert into classificacao values (?, ?, ?)`;

    const { lastID } = await db.run(request, classif);

    return lastID;
}

export async function readAll() {
    const db = await database.connect();

    const request = `select * from classificacao;`;

    const classificacoes = await db.all(request);

    return classificacoes;
}

// TODO: consertar isso aqui
export async function read(classificacao) {
    const db = await database.connect();

    const request = `select d.nome, c.nome, s.nome 
                    from classificacao cf, departamento d, categoria c, subcategoria s 
                    on d.cod_dep = cf.cod_dep and c.cod_cat = cf.cod_cat
                    and s.cod_sub = cf.cod_sub;
                    `;

    const classificacoes = await db.all(request);

    return classificacoes;
}

console.log(await read([1, 2, 3]))

// TODO: Criar as classificações para criar as peças

export default create;