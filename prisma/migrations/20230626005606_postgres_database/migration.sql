-- CreateTable
CREATE TABLE "Usuario" (
    "codUsr" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "uf" TEXT,
    "cidade" TEXT,
    "rua" TEXT,
    "numero" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("codUsr")
);

-- CreateTable
CREATE TABLE "Marca" (
    "codMar" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("codMar")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "codDep" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("codDep")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "codCat" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("codCat")
);

-- CreateTable
CREATE TABLE "SubCategoria" (
    "codSub" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "SubCategoria_pkey" PRIMARY KEY ("codSub")
);

-- CreateTable
CREATE TABLE "Classificacao" (
    "codCla" SERIAL NOT NULL,
    "codDep" INTEGER NOT NULL,
    "codCat" INTEGER NOT NULL,
    "codSub" INTEGER NOT NULL,

    CONSTRAINT "Classificacao_pkey" PRIMARY KEY ("codCla")
);

-- CreateTable
CREATE TABLE "Produto" (
    "codProd" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "estadoUso" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "codUsrCr" INTEGER,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codUsrCp" INTEGER,
    "dataCompra" TIMESTAMP(3),
    "codCla" INTEGER NOT NULL,
    "codMar" INTEGER,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("codProd")
);

-- CreateTable
CREATE TABLE "DesejoUsuario" (
    "codUsr" INTEGER NOT NULL,
    "codProd" INTEGER NOT NULL,

    CONSTRAINT "DesejoUsuario_pkey" PRIMARY KEY ("codUsr","codProd")
);

-- CreateTable
CREATE TABLE "FotoProduto" (
    "codProd" INTEGER NOT NULL,
    "urlImg" TEXT NOT NULL,

    CONSTRAINT "FotoProduto_pkey" PRIMARY KEY ("codProd","urlImg")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_eMail_key" ON "Usuario"("eMail");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nome_key" ON "Marca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nome_key" ON "Departamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategoria_nome_key" ON "SubCategoria"("nome");

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_codDep_fkey" FOREIGN KEY ("codDep") REFERENCES "Departamento"("codDep") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_codCat_fkey" FOREIGN KEY ("codCat") REFERENCES "Categoria"("codCat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_codSub_fkey" FOREIGN KEY ("codSub") REFERENCES "SubCategoria"("codSub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_codUsrCr_fkey" FOREIGN KEY ("codUsrCr") REFERENCES "Usuario"("codUsr") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_codUsrCp_fkey" FOREIGN KEY ("codUsrCp") REFERENCES "Usuario"("codUsr") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_codCla_fkey" FOREIGN KEY ("codCla") REFERENCES "Classificacao"("codCla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_codMar_fkey" FOREIGN KEY ("codMar") REFERENCES "Marca"("codMar") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesejoUsuario" ADD CONSTRAINT "DesejoUsuario_codUsr_fkey" FOREIGN KEY ("codUsr") REFERENCES "Usuario"("codUsr") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesejoUsuario" ADD CONSTRAINT "DesejoUsuario_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "Produto"("codProd") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FotoProduto" ADD CONSTRAINT "FotoProduto_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "Produto"("codProd") ON DELETE CASCADE ON UPDATE CASCADE;
