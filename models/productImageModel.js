import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (Image) {
  const image = await prisma.fotoProduto.upsert({
    where: { codProd_urlImg: Image },
    update: {},
    create: Image
  })

  return image
}

export default { create }
