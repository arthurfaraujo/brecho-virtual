import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (Product) {
  const product = await prisma.produto.upsert({
    where: { codProd: 0 },
    update: {},
    create: Product
  })
  return product
}

async function readAll () {
  const products = await prisma.produto.findMany({
    include: { Imagens: true }
  })

  return products
}

async function createWithImage (Product, Images) {
  const product = await prisma.produto.upsert({
    where: { codProd: 0 },
    update: {},
    create: {
      nome: Product.nome,
      descricao: Product.descricao || null,
      estadoUso: Product.estadoUso,
      preco: parseFloat(Product.preco),
      codUsrCr: parseInt(Product.codUsrCr) || null,
      codCla: parseInt(Product.codCla),
      codMar: parseInt(Product.codMar) || null,
      Imagens: {
        create: Images
      }
    },
    include: { Imagens: true }
  })

  return product
}

async function remove (codProd) {
  const product = await prisma.produto.delete({
    where: { codProd },
    include: { Imagens: true }
  })

  return product
}

export default { create, readAll, createWithImage, remove }
