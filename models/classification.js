import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (Classification) {
  const classification = await prisma.classificacao.upsert({
    where: { codCla: 0 },
    update: {},
    create: Classification
  })
  return classification
}

async function readAll () {
  const classifications = await prisma.classificacao.findMany({
    include: {
      dep: true,
      cat: true,
      sub: true
    }
  })

  return classifications
}

export default { create, readAll }
