import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (User) {
  const user = await prisma.usuario.create({
    data: {
      nome: User.nome || null,
      eMail: User.eMail || null,
      senha: User.senha || null,
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
    where: { eMail }
  })

  if (user) {
    if (user.senha === senha) {
      return { codUsr: user.codUsr, nomeUsr: user.nome }
    } else {
      throw new Error('Senha incorreta para o usuário!')
    }
  } else {
    throw new Error('E-mail não cadastrado!')
  }
}

async function remove (codUsr) {
  const user = await prisma.usuario.delete({
    where: { codUsr }
  })

  if (user) {
    return user
  }
}

export default { create, remove, auth }
