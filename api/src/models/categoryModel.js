import { prisma } from "../prismaDb/prismaConnection.js";

async function createUnique(Category) {
    try {
        const category = await prisma.categoria.upsert({
            where: { nome: Category.nome },
            update: {},
            create: { nome: Category.nome },
        });
        return category;
    } catch (error) {
        return error;
    }
}

export default { createUnique };