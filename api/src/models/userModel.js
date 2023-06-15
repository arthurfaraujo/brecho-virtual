import { prisma } from '../prismaDb/prismaConnection.js'

async function create (User) {
  const user = await prisma.usuario.upsert({
    where: { eMail: User.eMail },
    update: {},
    create: {
      nome: User.nome,
      eMail: User.eMail,
      senha: User.senha,
      telefone: User.telefone || null,
      uf: User.uf || null,
      cidade: User.cidade || null,
      rua: User.rua || null,
      numero: User.numero || null
    }
  })
  return user
}

export default { create }
