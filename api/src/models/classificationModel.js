import { prisma } from '../prismaDb/prismaConnection.js'

async function create (Classification) {
  const classification = await prisma.classificacao.upsert({
    where: { codCla: 0 },
    update: {},
    create: Classification
  })
  return classification
}

export default { create }
