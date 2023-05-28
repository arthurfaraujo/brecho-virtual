import database from './database.js';

async function up() {
    const db = await database.connect();

    const usuario = `
        CREATE TABLE usuario (
            cod_usr     INTEGER PRIMARY KEY AUTOINCREMENT,
            e_mail      VARCHAR(60)    UNIQUE NOT NULL,
            senha       VARCHAR(8)            NOT NULL,
            nome        VARCHAR(80)           NOT NULL,
            telefone    INTEGER(11),
            uf          CHAR(2),
            cidade      VARCHAR(50),
            rua         VARCHAR(90),
            numero      INTEGER(5) 
        );
    `;    
    await db.run(usuario);

    const marcas = `
        CREATE TABLE marca (
            cod_mar    INTEGER PRIMARY KEY AUTOINCREMENT,
            mar       VARCHAR(40)             NOT NULL
        );
    `;
    await db.run(marcas);

    const departamento = `
        CREATE TABLE departamento (
            cod_dep    INTEGER PRIMARY KEY AUTOINCREMENT,
            dep       varchar(40)             NOT NULL
        );
    `;
    await db.run(departamento);

    const categoria = `
        CREATE TABLE categoria (
            cod_cat    INTEGER PRIMARY KEY AUTOINCREMENT,
            cat       varchar(40)             NOT NULL
        );
    `;
    await db.run(categoria);

    const subcategoria = `
        CREATE TABLE subcategoria (
            cod_sub    INTEGER PRIMARY KEY AUTOINCREMENT,
            sub      varchar(40)             NOT NULL
        );
    `;
    await db.run(subcategoria);

    const classificacao = `    
        CREATE TABLE classificacao (
            cod_cla         INTEGER PRIMARY KEY AUTOINCREMENT,
            cod_dep         INTEGER,
            cod_cat         INTEGER,
            cod_sub         INTEGER,
        
            FOREIGN KEY (cod_dep)
                REFERENCES departamento (cod_dep),
            FOREIGN KEY (cod_cat)
                REFERENCES categoria    (cod_cat),
            FOREIGN KEY (cod_sub)
                REFERENCES subcategoria (cod_sub)
        );
    `;
    await db.run(classificacao);

    const peca = `
        CREATE TABLE peca (
            cod_pec     INTEGER PRIMARY KEY AUTOINCREMENT, 
            descricao   VARCHAR(200),
            estado_uso  VARCHAR(20)      NOT NULL,
            preco       NUMERIC(8,2)     NOT NULL,
            nome        VARCHAR(80)      NOT NULL,
            cod_usr_cp  CHAR(36),
            cod_cla     INTEGER,
            cod_mar     INTEGER,
            cod_usr_cr  INTEGER,
            data_compra CHAR(10),
        
            FOREIGN KEY (cod_usr_cp)
                REFERENCES usuario (cod_usr_cp),
            FOREIGN KEY (cod_usr_cr)
                REFERENCES usuario (cod_usr_cr),
            FOREIGN KEY (cod_mar)
                REFERENCES marca (cod_mar),
            FOREIGN KEY (cod_cla)
                REFERENCES classificacao (cod_cla)
        );
    `;
    await db.run(peca);

    const lista_desejo = `
        CREATE TABLE lista_desejo (
            cod_usr     INTEGER,
            cod_pec     INTEGER,
        
            PRIMARY KEY (cod_usr, cod_pec),    
            FOREIGN KEY (cod_pec)
                REFERENCES peca (cod_pec),
            FOREIGN KEY (cod_usr)
                REFERENCES usuario (cod_usr)
        );
    `;
    await db.run(lista_desejo);
    
    const foto_produto = `
        CREATE TABLE foto_produto (
            cod_pec     INTEGER,
            url_img     VARCHAR(500),
        
            PRIMARY KEY (cod_pec, url_img),
            FOREIGN KEY (cod_pec)
                REFERENCES peca (cod_pec)
        );
    `;
    await db.run(foto_produto);
}

export default { up }