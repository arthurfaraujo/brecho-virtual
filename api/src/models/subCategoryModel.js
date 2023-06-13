import { prisma } from "../prismaDb/prismaConnection.js";

async function createUnique(subCategory) {
    try {
        const sub_category = await prisma.subCategoria.upsert({
            where: { nome: subCategory.nome },
            update: {},
            create: { nome: subCategory.nome },
        });
        return sub_category;
    } catch (error) {
        return error;
    }
}

export default { createUnique };