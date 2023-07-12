import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (Wish) {
  const wish = await prisma.desejoUsuario.upsert({
    where: { codUsr_codProd: Wish },
    update: {},
    create: Wish
  })

  return wish
}

async function readUserWishes (codUsr) {
  const wishes = await prisma.desejoUsuario.findMany({
    where: { codUsr },
    include: {
      Produto: {
        include: { Imagens: true }
      }
    }
  })

  return wishes
}
export default { create, readUserWishes }
