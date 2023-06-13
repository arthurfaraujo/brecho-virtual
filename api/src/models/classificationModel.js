import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Classification) {
    try {
        const classification = await prisma.classificacao.upsert({
            where: { codCla: Classification.codCla },
            update: {},
            create: {
                codDep: Classification.codDep,
                codCat: Classification.codCat,
                codSub: Classification.codSub,
            },
        });
        return classification;
    } catch (error) {
        throw error;
    }
}

export default { create };