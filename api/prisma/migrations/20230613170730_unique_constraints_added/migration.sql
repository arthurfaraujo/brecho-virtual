/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Marca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `SubCategoria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nome_key" ON "Departamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nome_key" ON "Marca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategoria_nome_key" ON "SubCategoria"("nome");
