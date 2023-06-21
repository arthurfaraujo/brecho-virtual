/*
  Warnings:

  - You are about to alter the column `preco` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "codProd" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "estadoUso" TEXT NOT NULL,
    "preco" REAL NOT NULL,
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
INSERT INTO "new_Produto" ("codCla", "codMar", "codProd", "codUsrCp", "codUsrCr", "dataCompra", "dataCriacao", "descricao", "estadoUso", "nome", "preco") SELECT "codCla", "codMar", "codProd", "codUsrCp", "codUsrCr", "dataCompra", "dataCriacao", "descricao", "estadoUso", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
