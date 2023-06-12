-- CreateTable
CREATE TABLE "Usuario" (
    "codUsr" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Marca" (
    "codMar" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Departamento" (
    "codDep" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categoria" (
    "codCat" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SubCategoria" (
    "codSub" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Classificacao" (
    "codCla" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codDep" INTEGER NOT NULL,
    "codCat" INTEGER NOT NULL,
    "codSub" INTEGER NOT NULL,
    CONSTRAINT "Classificacao_codDep_fkey" FOREIGN KEY ("codDep") REFERENCES "Departamento" ("codDep") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Classificacao_codCat_fkey" FOREIGN KEY ("codCat") REFERENCES "Categoria" ("codCat") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Classificacao_codSub_fkey" FOREIGN KEY ("codSub") REFERENCES "SubCategoria" ("codSub") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Peca" (
    "codPec" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "estadoUso" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "codUsrCr" INTEGER,
    "codCla" INTEGER NOT NULL,
    "codMar" INTEGER,
    "codUsrCp" INTEGER,
    "dataCompra" DATETIME,
    CONSTRAINT "Peca_codUsrCr_fkey" FOREIGN KEY ("codUsrCr") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peca_codCla_fkey" FOREIGN KEY ("codCla") REFERENCES "Classificacao" ("codCla") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Peca_codMar_fkey" FOREIGN KEY ("codMar") REFERENCES "Marca" ("codMar") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peca_codUsrCp_fkey" FOREIGN KEY ("codUsrCp") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ListaDesejo" (
    "codUsr" INTEGER NOT NULL,
    "codPec" INTEGER NOT NULL,

    PRIMARY KEY ("codUsr", "codPec"),
    CONSTRAINT "ListaDesejo_codUsr_fkey" FOREIGN KEY ("codUsr") REFERENCES "Usuario" ("codUsr") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListaDesejo_codPec_fkey" FOREIGN KEY ("codPec") REFERENCES "Peca" ("codPec") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FotoProduto" (
    "codPec" INTEGER NOT NULL,
    "urlImg" TEXT NOT NULL,

    PRIMARY KEY ("codPec", "urlImg"),
    CONSTRAINT "FotoProduto_codPec_fkey" FOREIGN KEY ("codPec") REFERENCES "Peca" ("codPec") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_eMail_key" ON "Usuario"("eMail");
