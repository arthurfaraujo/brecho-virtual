import userModel from '../models/userModel.js'

function handleErrors (err) {
  if (err.message.includes('prisma')) {
    const message = err.message.split('\n')
    switch (message[message.length - 1]) {
      case 'Unique constraint failed on the fields: (`eMail`)':
        return 'E-mail já em uso!'
      case 'Argument `eMail` must not be null.':
        return 'Preencha o e-mail!'
      case 'Argument `senha` must not be null.':
        return 'Preencha a senha!'
      case 'Argument `nome` must not be null.':
        return 'Preencha o nome!'
    }
    return message[message.length - 1]
  } else {
    return err.message
  }
}

function accessGet (req, res) {
  res.render('entrada')
}

async function loginPost (req, res, next) {
  try {
    const dataUsuario = req.body
    const codUsuario = await userModel.auth(dataUsuario.eMail, dataUsuario.senha)
    if (codUsuario) {
      res.redirect('/')
    }
  } catch (e) {
    e.code = 400
    e.messageUsr = e.message
    next(e)
  }
}

async function userPost (req, res, next) {
  try {
    const dados = req.body
    await userModel.create(dados)
    res.redirect('/entrada')
  } catch (e) {
    const message = handleErrors(e)
    e.code = 400
    e.messageUsr = message
    next(e)
  }
}

async function userDelete (req, res, next) {
  try {
    const codUsrString = req.query.codUsr
    const codUsr = parseInt(codUsrString)
    const usuario = await userModel.remove(codUsr)

    if (!usuario) {
      throw new Error('Usuário não encontrado.')
    }

    res.json({ message: 'Conta excluída com sucesso!' })
  } catch (e) {
    e.code = 400
    next(e)
  }
}

export default { accessGet, loginPost, userPost, userDelete }
