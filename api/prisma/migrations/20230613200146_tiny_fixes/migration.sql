/*
  Warnings:

  - You are about to alter the column `preco` on the `Peca` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Peca" (
    "codPec" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    CONSTRAINT "Peca_codUsrCr_fkey" FOREIGN KEY ("codUsrCr") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peca_codUsrCp_fkey" FOREIGN KEY ("codUsrCp") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peca_codCla_fkey" FOREIGN KEY ("codCla") REFERENCES "Classificacao" ("codCla") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Peca_codMar_fkey" FOREIGN KEY ("codMar") REFERENCES "Marca" ("codMar") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Peca" ("codCla", "codMar", "codPec", "codUsrCp", "codUsrCr", "dataCompra", "dataCriacao", "descricao", "estadoUso", "nome", "preco") SELECT "codCla", "codMar", "codPec", "codUsrCp", "codUsrCr", "dataCompra", "dataCriacao", "descricao", "estadoUso", "nome", "preco" FROM "Peca";
DROP TABLE "Peca";
ALTER TABLE "new_Peca" RENAME TO "Peca";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
