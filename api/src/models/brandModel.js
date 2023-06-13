import { prisma } from "../prismaDb/prismaConnection.js";

async function createUnique(Brand) {
    try {
        const brand = await prisma.marca.upsert({
            where: { nome: Brand.nome },
            update: {},
            create: { nome: Brand.nome },
        });
        return brand;
    } catch (error) {
        return error;
    }
}

export default { createUnique };
