import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Category) {
    try {
        const category = await prisma.categoria.upsert({
            where: Category,
            update: {},
            create: Category,
        });
        return category;
    } catch (error) {
        throw error;
    }
}

export default { create };