/*
  Warnings:

  - You are about to drop the `ListaDesejo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ListaDesejo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DesejoUsuario" (
    "codUsr" INTEGER NOT NULL,
    "codPec" INTEGER NOT NULL,

    PRIMARY KEY ("codUsr", "codPec"),
    CONSTRAINT "DesejoUsuario_codUsr_fkey" FOREIGN KEY ("codUsr") REFERENCES "Usuario" ("codUsr") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DesejoUsuario_codPec_fkey" FOREIGN KEY ("codPec") REFERENCES "Peca" ("codPec") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Peca" (
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
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Peca_codUsrCr_fkey" FOREIGN KEY ("codUsrCr") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peca_codCla_fkey" FOREIGN KEY ("codCla") REFERENCES "Classificacao" ("codCla") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Peca_codMar_fkey" FOREIGN KEY ("codMar") REFERENCES "Marca" ("codMar") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Peca_codUsrCp_fkey" FOREIGN KEY ("codUsrCp") REFERENCES "Usuario" ("codUsr") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Peca" ("codCla", "codMar", "codPec", "codUsrCp", "codUsrCr", "dataCompra", "descricao", "estadoUso", "nome", "preco") SELECT "codCla", "codMar", "codPec", "codUsrCp", "codUsrCr", "dataCompra", "descricao", "estadoUso", "nome", "preco" FROM "Peca";
DROP TABLE "Peca";
ALTER TABLE "new_Peca" RENAME TO "Peca";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
