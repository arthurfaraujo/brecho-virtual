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
  console.log(typeof wishes)
  return wishes
}

async function deleteUserWish (Wish) {
  const wish = await prisma.desejoUsuario.delete({
    where: { codUsr_codProd: Wish }
  })

  return wish
}
export default { create, readUserWishes, deleteUserWish }
