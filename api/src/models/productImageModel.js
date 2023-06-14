import { prisma } from "../prismaDb/prismaConnection.js";

async function create(Image) {
    try {
        const image = await prisma.fotoProduto.upsert({
            where: {codProd_urlImg: Image},
            update: {},
            create: Image,
        });

        return image
    } catch (error) {
        throw error;
    }
}

export default { create };