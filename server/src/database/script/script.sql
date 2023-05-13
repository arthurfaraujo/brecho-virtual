------------------------------------------------
--- Criação da tabela Usuário
------------------------------------------------
CREATE TABLE usuario (
    cod_usr     CHAR(36)    PRIMARY KEY,
    e_mail      VARCHAR(60)      UNIQUE,
    senha       VARCHAR(8)     NOT NULL,
    nome        VARCHAR(80)    NOT NULL,
    telefone    INTEGER(11),
    UF          CHAR(2)        NOT NULL,
    cidade      VARCHAR(50)    NOT NULL,
    rua         VARCHAR(90)    NOT NULL,
    numero      INTEGER(5)     NOT NULL
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
    cod_dep                       INTEGER,
    cod_cat                       INTEGER,
    cod_sub                       INTEGER,

    PRIMARY KEY (cod_dep, cod_cat, cod_sub),
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
    cod_pec     CHAR(36)      PRIMARY KEY, 
    descricao   VARCHAR(200),
    estado_uso  VARCHAR(20)      NOT NULL,
    preco       NUMERIC(8,2)     NOT NULL,
    nome        VARCHAR(80)      NOT NULL,
    cod_usr_cp  CHAR(36),
    data_compra CHAR(10) 
    CHECK (data_compra LIKE "__/__/____"),
    cod_dep     INTEGER           NOT NULL,
    cod_cat     INTEGER           NOT NULL,
    cod_sub     INTEGER           NOT NULL,
    cod_mar     INTEGER,
    cod_usr_cr  CHAR(36),

    FOREIGN KEY (cod_usr_cr)
        REFERENCES usuario (cod_usr_cr)
    FOREIGN KEY (cod_mar)
        REFERENCES marca (cod_mar),
    FOREIGN KEY (cod_usr_cp)
        REFERENCES usuario (cod_usr)
    FOREIGN KEY (cod_sub)
        REFERENCES subcategoria (cod_sub),
    FOREIGN KEY (cod_cat)
        REFERENCES categoria (cod_cat),
    FOREIGN KEY (cod_dep)
        REFERENCES departamento (cod_dep)
);

-----------------------||-----------------------

------------------------------------------------
--- Criação da tabela Lista_Desejo
------------------------------------------------
CREATE TABLE lista_desejo (
    cod_usr     CHAR(36),
    cod_pec     CHAR(36),

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
    cod_pec     CHAR(36),
    url_img     VARCHAR(300),

    PRIMARY KEY (cod_pec, url_img),
    FOREIGN KEY (cod_pec)
        REFERENCES peca (cod_pec)
);

-----------------------||-----------------------