import { prisma } from '../prismaDb/prismaConnection.js';

async function create(Product) {
    try {
        const product = await prisma.produto.upsert({
            where: {codProd: 0},
            update: {},
            create: Product
        });
        return product;
    } catch (error) {
        throw error;
    }
}

export default { create }