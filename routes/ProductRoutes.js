import { Router } from 'express'
import productController from '../controllers/productController.js'
import { auth } from '../middlewares/AuthMiddleware.js'
import multer from 'multer'
import crypto from 'node:crypto'

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

const route = Router()

route.get('/cadastra', auth, productController.productCreateGet)

route.post('/cadastra', auth, imagens.array('imagem[]', 5), productController.productCreatePost)

route.delete('/remove', auth, productController.productDelete)

route.get('/dados', productController.productsDataGet)

route.patch('/compra/:codProd', auth, productController.productBuyPatch)

route.get('/info/:codProd', auth, productController.productDetailGet)

export default route
