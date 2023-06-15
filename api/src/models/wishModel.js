import { prisma } from '../prismaDb/prismaConnection.js'

async function create (Wish) {
  const wish = await prisma.desejoUsuario.upsert({
    where: { codUsr_codProd: Wish },
    update: {},
    create: Wish
  })

  return wish
}

export default { create }
