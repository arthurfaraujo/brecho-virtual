import { prisma } from "../prismaDb/prismaConnection.js";

async function create(SubCategory) {
    try {
        const subCategory = await prisma.subCategoria.upsert({
            where: SubCategory,
            update: {},
            create: SubCategory,
        });
        return subCategory;
    } catch (error) {
        throw error;
    }
}

export default { create };