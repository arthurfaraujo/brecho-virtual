import { prisma } from "../prismaDb/prismaConnection.js";

async function createUnique(Department) {
    try {
        const department = await prisma.departamento.upsert({
            where: { nome: Department.nome },
            update: {},
            create: { nome: Department.nome },
        });
        return department;
    } catch (error) {
        return error;
    }
}

export default { createUnique };
