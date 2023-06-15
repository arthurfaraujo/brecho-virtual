// importação de bibliotecas importantes
// models
import Clothes from '../database/models/clothes.js'
import Images from '../database/models/productsImages.js'
import Users from '../database/models/users.js'

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
  const dados = { ...req.body }
  try {
    const usuario = await user.auth(dados)
    if (usuario === 1) {
      throw new HTTPError('Usuário e/ou senha incorreto(s).', 400)
    } else {
      res.redirect('/')
    }
  } catch (e) {
    next(e)
  }
})
// cadastra um novo usuário
rota.post('/usuario', async (req, res, next) => {
  const dados = { ...req.body }
  try {
    const lastid = await Users.create(dados)
    res.redirect('/entrada')
  } catch (e) {
    next(e)
  }
})
// remove um usuário
rota.delete('/usuario', async (req, res, next) => {
  const codUsr = req.query.codUsr

  try {
    const changes = await Users.remove(codUsr)

    if (changes === 0) {
      throw new HTTPError('Usuário não encontrado.', 400)
    }

    res.json({ message: 'Conta excluída com sucesso!' })
  } catch (e) {
    next(e)
  }
})
// cadastra um produto e suas imagens
rota.post('/produto', imagens.array('imagem', 5), async (req, res, next) => {
  const dados = { ...req.body }
  const images = req.files

  try {
    const lastIdC = await Clothes.create(dados)

    for (const img of images) {
      const path = img.path

      const fotoProduto = { cod_pec: lastIdC, url_img: path }

      const lastIdI = await Images.create(fotoProduto)
    }

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
