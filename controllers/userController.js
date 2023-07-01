import userModel from '../models/userModel.js'

function accessGet (req, res) {
  res.render('entrada')
}

async function loginPost (req, res, next) {
  try {
    const dataUsuario = req.body
    const codUsuario = await userModel.auth(dataUsuario.eMail, dataUsuario.senha)
    if (codUsuario) {
      res.redirect('/')
    } else {
      throw new Error('Usuário e/ou senha incorreto(s)!')
    }
  } catch (e) {
    next(e)
  }
}

async function userPost (req, res, next) {
  try {
    const dados = req.body
    await userModel.create(dados)
    res.redirect('/entrada')
  } catch (e) {
    e.code = 400
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
