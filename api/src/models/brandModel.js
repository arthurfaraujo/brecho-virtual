import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Brand) {
    try {
        const brand = await prisma.marca.upsert({
            where: Brand,
            update: {},
            create: Brand,
        });
        return brand;
    } catch (error) {
        throw error;
    }
}

export default { create };