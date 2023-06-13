import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Classification) {
    try {
        const classification = await prisma.classificacao.upsert({
            where: { codCla: 0 },
            update: {},
            create: Classification,
        });
        return classification;
    } catch (error) {
        throw error;
    }
}

export default { create };