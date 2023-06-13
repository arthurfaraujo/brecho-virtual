-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "codUsr" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "uf" TEXT,
    "cidade" TEXT,
    "rua" TEXT,
    "numero" TEXT
);
INSERT INTO "new_Usuario" ("cidade", "codUsr", "eMail", "nome", "numero", "rua", "senha", "telefone", "uf") SELECT "cidade", "codUsr", "eMail", "nome", "numero", "rua", "senha", "telefone", "uf" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_eMail_key" ON "Usuario"("eMail");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
