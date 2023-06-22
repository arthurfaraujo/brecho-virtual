// bibliotecas de funções variadas
import multer from 'multer'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
// models
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'
// sistema de rotas do express
import { Router } from 'express'

// errors
class HTTPError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}
// constante que agrega as rotas
const rota = Router()

// acesso à parte visual do sistema
rota.get('/', (req, res) => {
  res.render('home')
})

rota.get('/entrada', (req, res) => {
  res.render('entrada')
})

// importação de bibliotecas importantes

// TODO: procurar sobre o bcrypt

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
rota.get('/cadastro/produto', (req, res, next) => {
  res.render('cadastro_produto.ejs')
})

// acesso do usuário à parte de dados do sistema
// verifica se o usuário existe e se logou corretamente
rota.post('/cadastro/login', async (req, res, next) => {
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
rota.post('/cadastro/usuario', async (req, res, next) => {
  const dados = req.body
  try {
    await userModel.create(dados)
    res.redirect('/entrada')
  } catch (e) {
    next(e)
  }
})
// remove um usuário
rota.delete('/cadastro/usuario', async (req, res, next) => {
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
rota.post('/cadastro/produto', imagens.array('imagem', 5), async (req, res, next) => {
  const data = req.body
  const imagesData = req.files
  const images = []
  for (const image of imagesData) {
    images.push({ urlImg: image.path })
  }
  try {
    console.log(await productModel.createWithImage(data, images))
    res.json({ message: 'Cadastro realizado com sucesso!' })
  } catch (e) {
    next(e)
  }
})

// remove um produto
rota.delete('/cadastro/produto', async (req, res, next) => {
  const codProdString = req.query.codProd
  const codProd = parseInt(codProdString)

  try {
    const produtos = await productModel.remove(codProd)

    console.log(produtos)

    for (const imagem of produtos.Imagens) {
      await fs.unlink(imagem.urlImg)
    }

    res.json({ message: 'Produto removido com sucesso!' })
  } catch (e) {
    next(e)
  }
})

// acesso do front à parte de dados
// envia os produtos
rota.get('/data/produtos', async (req, res, next) => {
  try {
    // console.log(await productModel.readAll())
    res.json(await productModel.readAll())
  } catch (e) {
    next(e)
  }
})

// Manipular erros sem quebrar o servidor
// 404
rota.use((req, res, next) => {
  res.status(404).json({ message: 'Página não encontrada!' })
})

// Outros
rota.use((err, req, res, next) => {
  console.error(err.stack)
  if (err && err instanceof HTTPError) {
    // res.status(err.code).json({ message: err.message })
    res.render('error', { errorMessage: err.message, errorCode: err.code })
  } else {
    // res.status(500).json({ message: 'Algo deu muito errado!' })
    res.render('error', { errorMessage: 'Houve um erro interno!', errorCode: 500 })
  }
})

export default rota
