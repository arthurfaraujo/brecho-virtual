/*
  Warnings:

  - You are about to drop the `Peca` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `FotoProduto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codPec` on the `FotoProduto` table. All the data in the column will be lost.
  - The primary key for the `DesejoUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codPec` on the `DesejoUsuario` table. All the data in the column will be lost.
  - Added the required column `codProd` to the `FotoProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codProd` to the `DesejoUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Peca";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Produto" (
    "codProd" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "estadoUso" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "codUsrCr" INTEGER,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codUsrCp" INTEGER,
    "dataCompra" DATETIME,
    "codCla" INTEGER NOT NULL,
    "codMar" INTEGER,
    CONSTRAINT "Produto_codUsrCr_fkey" FOREIGN KEY ("codUsrCr") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_codUsrCp_fkey" FOREIGN KEY ("codUsrCp") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_codCla_fkey" FOREIGN KEY ("codCla") REFERENCES "Classificacao" ("codCla") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_codMar_fkey" FOREIGN KEY ("codMar") REFERENCES "Marca" ("codMar") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FotoProduto" (
    "codProd" INTEGER NOT NULL,
    "urlImg" TEXT NOT NULL,

    PRIMARY KEY ("codProd", "urlImg"),
    CONSTRAINT "FotoProduto_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "Produto" ("codProd") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FotoProduto" ("urlImg") SELECT "urlImg" FROM "FotoProduto";
DROP TABLE "FotoProduto";
ALTER TABLE "new_FotoProduto" RENAME TO "FotoProduto";
CREATE TABLE "new_DesejoUsuario" (
    "codUsr" INTEGER NOT NULL,
    "codProd" INTEGER NOT NULL,

    PRIMARY KEY ("codUsr", "codProd"),
    CONSTRAINT "DesejoUsuario_codUsr_fkey" FOREIGN KEY ("codUsr") REFERENCES "Usuario" ("codUsr") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DesejoUsuario_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "Produto" ("codProd") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DesejoUsuario" ("codUsr") SELECT "codUsr" FROM "DesejoUsuario";
DROP TABLE "DesejoUsuario";
ALTER TABLE "new_DesejoUsuario" RENAME TO "DesejoUsuario";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
