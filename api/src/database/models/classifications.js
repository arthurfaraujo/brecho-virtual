import database from "../js/database.js";

async function create(classif) {
    const db = await database.connect();

    const query = `insert into classificacao (cod_dep, cod_cat, 
    cod_sub) values (?, ?, ?)`;

    const { cod_dep, cod_cat, cod_sub } = classif;

    const { lastID } = await db.run(query, [cod_dep, cod_cat, cod_sub]);

    return lastID;
}

async function read(classif) {
    const db = await database.connect();
  
    const query = `select d.dep, c.cat, s.sub
                      from classificacao cf
                      join departamento d on cf.cod_dep = d.cod_dep
                      join categoria ca on cf.cod_cat = c.cod_cat
                      join subcategoria s on cf.cod_sub = s.cod_sub
                      where cf.cod_cla = ?;`;

    const { cod_cla } = classif;
    
    const { dep, cat, sub } = await db.get(query, [cod_cla]);
  
    return [dep, cat, sub];
}

async function readAllCod() {
    const db = await database.connect();

    const query = `select d.cod_dep as dep, c.cod_cat as cat, s.cod_sub as sub
                    from classificacao cf
                    join departamento d on cf.cod_dep = d.cod_dep
                    join categoria c on cf.cod_cat = c.cod_cat
                    join subcategoria s on cf.cod_sub = s.cod_sub;`;

    const classifs = await db.all(query);

    return classifs;
}

async function readAll() {
    const db = await database.connect();

    const query = `select cf.cod_cla, d.dep, c.cat, s.sub
                    from classificacao cf
                    join departamento d on cf.cod_dep = d.cod_dep
                    join categoria c on cf.cod_cat = c.cod_cat
                    join subcategoria s on cf.cod_sub = s.cod_sub;`;

    const classifs = await db.all(query);

    return classifs;
}

export default { create, read, readAll, readAllCod };