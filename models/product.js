import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create(Product) {
  const product = await prisma.produto.upsert({
    where: { codProd: 0 },
    update: {},
    create: Product
  })
  return product
}

async function readAll() {
  const products = await prisma.produto.findMany({
    include: { Imagens: true }
  })

  return products
}

async function readAllFromUser(codUsrCr) {
  const products = await prisma.produto.findMany({
    where: { codUsrCr },
    include: { Imagens: true }
  })

  return products
}

async function readOne(codProd) {
  const product = await prisma.produto.findUnique({
    where: { codProd },
    include: { Imagens: true }
  })

  return product
}
async function createWithImage(Product, Images) {
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

async function remove(codProd) {
  const product = await prisma.produto.delete({
    where: { codProd },
    include: { Imagens: true }
  })

  return product
}

async function buy(codProd, codUsr) {
  const product = await prisma.produto.update({
    where: { codProd },
    data: { codUsrCp: codUsr }
  })

  return product
}

async function update(oldProduct) {
  const { nome, descricao, preco, codProd } = oldProduct
  const newProduct = await prisma.produto.update({
    where: { codProd },
    data: {
      nome,
      descricao,
      preco: Number(preco)
    }
  })

  return newProduct
}

export default {
  create,
  readAll,
  readAllFromUser,
  readOne,
  createWithImage,
  remove,
  buy,
  update
}
