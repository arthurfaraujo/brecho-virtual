import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (SubCategory) {
  const subCategory = await prisma.subCategoria.upsert({
    where: SubCategory,
    update: {},
    create: SubCategory
  })
  return subCategory
}

export default { create }
