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

async function auth (eMail, senha) {
  const user = await prisma.usuario.findUnique({
    where: { eMail },
    select: {
      codUsr: true,
      senha: true
    }
  })

  if (user && user.senha === senha) {
    return user.codUsr
  } else {
    return 0
  }
}

export default { create, auth }
