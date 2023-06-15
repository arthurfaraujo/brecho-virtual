import { prisma } from '../prismaDb/prismaConnection.js'

async function create (Brand) {
  const brand = await prisma.marca.upsert({
    where: Brand,
    update: {},
    create: Brand
  })
  return brand
}

export default { create }
