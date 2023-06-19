import { prisma } from '../prismaDb/prismaConnection.js'

async function create (Product) {
  const product = await prisma.produto.upsert({
    where: { codProd: 0 },
    update: {},
    create: Product
  })
  return product
}

async function readAll () {
  const products = await prisma.produto.findMany()

  return products
}

async function createWithImage (Product, Images) {
  const product = await prisma.produto.upsert({
    where: { codProd: 0 },
    update: {},
    create: {
      Product,
      Imagens: {
        create: Images
      }
    }
  })

  return product
}

export default { create, readAll, createWithImage }
