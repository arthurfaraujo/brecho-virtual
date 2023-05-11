import database from "../database/database.js";

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

export async function read(classificacao) {
  const db = await database.connect();

  const request = `select d.nome as dep, c.nome as cat, s.nome as sub
                    from classificacao cf
                    join departamento d on cf.cod_dep = d.cod_dep
                    join categoria c on cf.cod_cat = c.cod_cat
                    join subcategoria s on cf.cod_sub = s.cod_sub
                    where cf.cod_dep = ? and
                    cf.cod_cat = ? and
                    cf.cod_sub = ?;`;

  const { dep, cat, sub } = await db.get(request, classificacao);

  return [dep, cat, sub];
}

// TODO: Criar as classificações para criar as peças

export default { create, read, readAll };