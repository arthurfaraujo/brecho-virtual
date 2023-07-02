// bibliotecas de funções variadas
import multer from 'multer'
import crypto from 'node:crypto'

// models
import classModel from '../models/classificationModel.js'
import brandModel from '../models/brandModel.js'

// controllers
import userController from '../controllers/userController.js'
import productController from '../controllers/productController.js'

// sistema de rotas do express
import { Router } from 'express'

// configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/produtos')
  },

  filename: (req, file, cb) => {
    const extensao = file.originalname.split('.')[1]

    const nomeNovo = crypto.randomBytes(16).toString('hex')

    cb(null, `${nomeNovo}.${extensao}`)
  }
})

// constante imagens que permite o uso do multer configurado
const imagens = multer({ storage })

// constante que agrega as rotas
const rota = Router()

// acesso à parte visual do sistema
rota.get('/', (req, res) => {
  res.render('home')
})

rota.get('/entrada', userController.getAccess)

rota.get('/cadastro/produto', productController.getProductCreate)

// acesso do usuário à parte de dados do sistema
// verifica se o usuário existe e se logou corretamente
rota.post('/cadastro/login', userController.postLogin)

// cadastra um novo usuário
rota.post('/cadastro/usuario', userController.postUser)

// remove um usuário
rota.delete('/cadastro/usuario', userController.deleteUser)

// cadastra um produto e suas imagens
rota.post('/cadastro/produto', imagens.array('imagem', 5), productController.postProduct)

// remove um produto
rota.delete('/cadastro/produto', productController.deleteProduct)

// acesso do front à parte de dados
// envia os produtos
rota.get('/data/produtos', productController.getProducts)

// envia as classificações
rota.get('/data/classificacoes', async (req, res, next) => {
  try {
    // console.log(await classModel.readAll())
    res.json(await classModel.readAll())
  } catch (e) {
    next(e)
  }
})

// envia as classificações
rota.get('/data/marcas', async (req, res, next) => {
  try {
    // console.log(await brandModel.readAll())
    res.json(await brandModel.readAll())
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
  console.log(err.message)
  if (err.code) {
    if (parseInt(err.code) < 600) {
      // res.status(err.code).json({ message: err.message })
      res.status(err.code).render('error', { errorMessage: err.messageUsr, errorCode: err.code })
    } else {
      res.status(400).render('error', { errorMessage: err.messageUsr, errorCode: 400 })
    }
  } else {
    // res.status(500).json({ message: 'Algo deu muito errado!' })
    res.status(500).render('error', { errorMessage: 'Houve um erro interno!', errorCode: 500 })
  }
})

export default rota
