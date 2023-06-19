// importação de bibliotecas importantes
// models
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
// errors
import { HTTPError } from './Error.js'
// sistema de rotas do express
import { Router } from 'express'

// bibliotecas de funções variadas
import multer from 'multer'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
// TODO: procurar sobre o bcrypt

// criação de constantes importantes
// constante de uso do router
const rota = Router()

// configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/produtos')
  },

  filename: (req, file, cb) => {
    const extensao = file.originalname.split('.')[1]

    const nomeNovo = crypto.randomBytes(20).toString('hex')

    cb(null, `${nomeNovo}.${extensao}`)
  }
})

// constante imagens que permite o uso do multer configurado
const imagens = multer({ storage })

// acesso do usuário à parte visual do cadastro
rota.get('/produto', (req, res, next) => {
  res.render('cadastro_produto.ejs')
})

// acesso do usuário à parte de dados do sistema
// verifica se o usuário existe e se logou corretamente
rota.post('/login', async (req, res, next) => {
  try {
    const usuario = req.body
    const codUsr = await userModel.auth(usuario.eMail, usuario.senha)
    // console.log(usuario)
    // console.log(codUsr)
    if (codUsr) {
      res.redirect('/')
    } else {
      throw new HTTPError('Usuário e/ou senha incorreto(s)!', 400)
    }
  } catch (e) {
    next(e)
  }
})
// cadastra um novo usuário
rota.post('/usuario', async (req, res, next) => {
  const dados = req.body
  try {
    await userModel.create(dados)
    res.redirect('/entrada')
  } catch (e) {
    next(e)
  }
})
// remove um usuário
rota.delete('/usuario', async (req, res, next) => {
  const codUsrString = req.query.codUsr
  const codUsr = parseInt(codUsrString)

  try {
    const usuario = await userModel.remove(codUsr)

    if (!usuario) {
      throw new HTTPError('Usuário não encontrado.', 400)
    }

    res.json({ message: 'Conta excluída com sucesso!' })
  } catch (e) {
    next(e)
  }
})
// cadastra um produto e suas imagens
rota.post('/produto', imagens.array('imagem', 5), async (req, res, next) => {
  const data = { ...req.body }
  const imagesData = req.files
  const images = []
  for (const image of imagesData) {
    images.push({ urlImg: image.path })
  }

  try {
    await productModel.createWithImage(data, images)
    res.json({ message: 'Cadastro realizado com sucesso!' })
  } catch (e) {
    next(e)
  }
})

// remove um produto
rota.delete('/produto', async (req, res, next) => {
  const codPec = req.query.codPec

  try {
    const imagens = await Images.readU(codPec)
    const changesC = await Clothes.remove(codPec)

    for (const imagem of imagens) {
      await fs.unlink(imagem.url_img)
    }

    if (changesC === 0) {
      throw new HTTPError('Produto não encontrado.', 400)
    }

    res.json({ message: 'Produto removido com sucesso!' })
  } catch (e) {
    next(e)
  }
})

export default rota
