------------------------------------------------
--- Criação da tabela Usuário
------------------------------------------------
CREATE TABLE usuario (
    cod_usr     INTEGER PRIMARY KEY AUTOINCREMENT,
    e_mail      VARCHAR(60)    UNIQUE NOT NULL,
    senha       VARCHAR(8)            NOT NULL,
    nome        VARCHAR(80)           NOT NULL,
    telefone    INTEGER(11),
    UF          CHAR(2),
    cidade      VARCHAR(50),
    rua         VARCHAR(90),
    numero      INTEGER(5) 
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela Marca
------------------------------------------------
CREATE TABLE marca (
    cod_mar    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       VARCHAR(40)             NOT NULL
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela departamento
------------------------------------------------
CREATE TABLE departamento (
    cod_dep    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       varchar(40)             NOT NULL
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela categoria
------------------------------------------------
CREATE TABLE categoria (
    cod_cat    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       varchar(40)             NOT NULL
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela subcategoria
------------------------------------------------
CREATE TABLE subcategoria (
    cod_sub    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       varchar(40)             NOT NULL
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela Classificação
------------------------------------------------
CREATE TABLE classificacao (
    cod_cla         INTEGER PRIMARY KEY AUTOINCREMENT,
    cod_dep         INTEGER,
    cod_cat         INTEGER,
    cod_sub         INTEGER,

    FOREIGN KEY (cod_dep)
        REFERENCES departamento (cod_dep),
    FOREIGN KEY (cod_cat)
        REFERENCES  categoria   (cod_cat),
    FOREIGN KEY (cod_sub)
        REFERENCES subcategoria (cod_sub)
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela Peça
------------------------------------------------
CREATE TABLE peca (
    cod_pec     INTEGER PRIMARY KEY AUTOINCREMENT, 
    descricao   VARCHAR(200),
    estado_uso  VARCHAR(20)      NOT NULL,
    preco       NUMERIC(8,2)     NOT NULL,
    nome        VARCHAR(80)      NOT NULL,
    cod_usr_cp  CHAR(36),
    cod_cla     INTEGER
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
)
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela Lista_Desejo
------------------------------------------------
CREATE TABLE lista_desejo (
    cod_usr     INTEGER,
    cod_pec     INTEGER,

    PRIMARY KEY (cod_usr, cod_pec),    
    FOREIGN KEY (cod_pec)
        REFERENCES peca (cod_pec),
    FOREIGN KEY (cod_usr)
        REFERENCES usuario (cod_usr)
);
-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela Foto_Produto
------------------------------------------------
CREATE TABLE foto_produto (
    cod_pec     INTEGER,
    url_img     VARCHAR(500),

    PRIMARY KEY (cod_pec, url_img),
    FOREIGN KEY (cod_pec)
        REFERENCES peca (cod_pec)
);
-----------------------||-----------------------