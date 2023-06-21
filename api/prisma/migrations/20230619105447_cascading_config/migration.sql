-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DesejoUsuario" (
    "codUsr" INTEGER NOT NULL,
    "codProd" INTEGER NOT NULL,

    PRIMARY KEY ("codUsr", "codProd"),
    CONSTRAINT "DesejoUsuario_codUsr_fkey" FOREIGN KEY ("codUsr") REFERENCES "Usuario" ("codUsr") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DesejoUsuario_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "Produto" ("codProd") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DesejoUsuario" ("codProd", "codUsr") SELECT "codProd", "codUsr" FROM "DesejoUsuario";
DROP TABLE "DesejoUsuario";
ALTER TABLE "new_DesejoUsuario" RENAME TO "DesejoUsuario";
CREATE TABLE "new_FotoProduto" (
    "codProd" INTEGER NOT NULL,
    "urlImg" TEXT NOT NULL,

    PRIMARY KEY ("codProd", "urlImg"),
    CONSTRAINT "FotoProduto_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "Produto" ("codProd") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FotoProduto" ("codProd", "urlImg") SELECT "codProd", "urlImg" FROM "FotoProduto";
DROP TABLE "FotoProduto";
ALTER TABLE "new_FotoProduto" RENAME TO "FotoProduto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
