import productModel from '../models/productModel.js'
import fs from 'node:fs/promises'

function getProductCreate (req, res) {
  res.render('cadastroProduto')
}

async function getProducts (req, res, next) {
  try {
    // console.log(await productModel.readAll())
    res.json(await productModel.readAll())
  } catch (e) {
    next(e)
  }
}

async function postProduct (req, res, next) {
  try {
    const data = req.body
    data.preco = parseFloat(data.preco)
    data.codCla = parseInt(data.codCla)
    data.codMar = parseInt(data.codMar)
    const imagesData = req.files
    const images = []
    for (const image of imagesData) {
      images.push({ urlImg: image.path.replace('public/', '') })
    }
    console.log(data)
    console.log(await productModel.createWithImage(data, images))
    res.redirect('/')
  } catch (e) {
    next(e)
  }
}

async function deleteProduct (req, res, next) {
  try {
    const codProdString = req.query.codProd
    const codProd = parseInt(codProdString)

    const produtos = await productModel.remove(codProd)

    for (const imagem of produtos.Imagens) {
      await fs.unlink(`public/${imagem.urlImg}`)
    }

    res.status(200).redirect('/')
  } catch (e) {
    next(e)
  }
}

export default { getProducts, postProduct, getProductCreate, deleteProduct }
