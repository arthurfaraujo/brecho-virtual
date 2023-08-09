import userModel from "../models/user.js"
import wishModel from "../models/wish.js"

function handleErrors(err) {
  if (err.message.includes("prisma")) {
    const message = err.message.split("\n")
    switch (message[message.length - 1]) {
      case "Unique constraint failed on the fields: (`eMail`)":
        return "E-mail já em uso!"
      case "Argument `eMail` must not be null.":
        return "Preencha o e-mail!"
      case "Argument `senha` must not be null.":
        return "Preencha a senha!"
      case "Argument `nome` must not be null.":
        return "Preencha o nome!"
      case "Unique constraint failed on the fields: (`codUsr`,`codProd`)":
        return "Produto já está na lista de desejos!"
    }
    return message[message.length - 1]
  } else {
    return err.message
  }
}

function userAccessGet(req, res) {
  res.render("userAccess")
}

async function userLoginPost(req, res, next) {
  try {
    const dataUsuario = req.body
    const usuario = await userModel.auth(dataUsuario.eMail, dataUsuario.senha)
    if (usuario) {
      res.cookie("codUsr", usuario.codUsr, { httpOnly: true })
      res.cookie("nomeUsr", usuario.nomeUsr, { httpOnly: true })
      res.redirect("/")
    }
  } catch (e) {
    e.code = 400
    e.messageUsr = e.message
    next(e)
  }
}

function userLogoutGet(req, res, next) {
  try {
    res.clearCookie("codUsr")
    res.clearCookie("nomeUsr")
    res.redirect("/")
  } catch (e) {
    e.code = 400
    next(e)
  }
}

async function userCreatePost(req, res, next) {
  try {
    const dados = req.body
    await userModel.create(dados)
    res.redirect("/usuario/acesso")
  } catch (e) {
    const message = handleErrors(e)
    e.code = 400
    e.messageUsr = message
    next(e)
  }
}

async function userDelete(req, res, next) {
  try {
    const codUsrString = req.cookies.codUsr
    const codUsr = parseInt(codUsrString)
    const usuario = await userModel.remove(codUsr)

    if (!usuario) {
      throw new Error("Usuário não encontrado.")
    }

    res.json({ message: "Conta excluída com sucesso!" })
  } catch (e) {
    e.code = 400
    next(e)
  }
}

async function userWishesDataGet(req, res, next) {
  try {
    const codUsr = parseInt(req.cookies.codUsr)
    const wishes = await wishModel.readUserWishes(codUsr)
    if (wishes.length) {
      console.log(wishes[0].Produto.Imagens[0].urlImg)
      res.json(wishes)
    } else {
      throw new Error("Nem um desejo encontrado!")
    }
  } catch (e) {
    e.code = 400
    next(e)
  }
}

async function userWishesGet(req, res, next) {
  try {
    const codUsr = parseInt(req.cookies.codUsr)
    const wishes = await wishModel.readUserWishes(codUsr)
    if (wishes.length) {
      res.render("wishList", { wishes })
    } else {
      throw new Error("Nem um desejo encontrado!")
    }
  } catch (e) {
    e.code = 400
    next(e)
  }
}

async function userWishCreatePost(req, res, next) {
  try {
    const codUsr = Number(req.cookies.codUsr)
    const codProd = Number(req.params.codProd)
    const wishData = { codUsr, codProd }
    const wish = await wishModel.create(wishData)
    console.log(wish)

    res.redirect("/usuario/deseja/")
  } catch (e) {
    e.code = 400
    e.message = handleErrors(e)
    next(e)
  }
}

async function userWishDelete(req, res, next) {
  try {
    const codUsr = Number(req.cookies.codUsr)
    const codProd = Number(req.params.codProd)
    const wishData = { codUsr, codProd }
    const wish = await wishModel.deleteUserWish(wishData)
    if (wish) {
      res
        .status(200)
        .json({ message: "Produto excluído da lista de desejos com sucesso!" })
    } else {
      throw new Error("Erro ao excluir produto da lista de desejos!")
    }
  } catch (e) {
    e.code = 400
    next(e)
  }
}

async function userProductsGet(req, res) {
  res.render("userProducts")
}

export default {
  userAccessGet,
  userLoginPost,
  userCreatePost,
  userDelete,
  userWishesDataGet,
  userWishesGet,
  userWishCreatePost,
  userWishDelete,
  userLogoutGet,
  userProductsGet,
}
