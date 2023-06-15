import { prisma } from '../prismaDb/prismaConnection.js'

async function create (Product) {
  const product = await prisma.produto.upsert({
    where: { codProd: 0 },
    update: {},
    create: Product
  })
  return product
}

export default { create }
