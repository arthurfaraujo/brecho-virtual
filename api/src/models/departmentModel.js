import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Department) {
    try {
        const department = await prisma.departamento.upsert({
            where: Department,
            update: {},
            create: Department,
        });
        return department;
    } catch (error) {
        throw error;
    }
}

export default { create };
