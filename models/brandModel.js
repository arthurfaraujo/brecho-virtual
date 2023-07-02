import { prisma } from "../prisma/prismaDb/prismaConnection.js";

async function create(Brand) {
    const brand = await prisma.marca.upsert({
        where: Brand,
        update: {},
        create: Brand,
    });
    return brand;
}

async function readAll() {
    const brands = await prisma.marca.findMany();

    return brands;
}

export default { create, readAll };
