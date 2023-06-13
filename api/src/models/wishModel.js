import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Wish) {
    try {
        const wish = await prisma.desejoUsuario.upsert({
            where: {codUsr_codProd: Wish},
            update: {},
            create: Wish,
        });

        return wish;
    } catch (error) {
        throw error;
    }
}

export default { create };