import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (Category) {
  const category = await prisma.categoria.upsert({
    where: Category,
    update: {},
    create: Category
  })
  return category
}

export default { create }
