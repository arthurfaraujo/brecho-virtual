import productModel from '../models/product.js'
import fs from 'node:fs/promises'

function productCreateGet (req, res) {
  res.render('productCreate')
}

async function productsDataGet (req, res, next) {
  try {
    // console.log(await productModel.readAll())
    res.json(await productModel.readAll())
  } catch (e) {
    next(e)
  }
}

async function productCreatePost (req, res, next) {
  try {
    const data = req.body
    data.codUsrCr = parseInt(req.cookies.codUsr)
    data.preco = data.preco.replace(',', '.')
    data.preco = parseFloat(data.preco)
    data.codCla = parseInt(data.codCla)
    data.codMar = parseInt(data.codMar)
    const imagesData = req.files
    const images = []
    for (const image of imagesData) {
      images.push({ urlImg: image.path.replace('public/', '') })
    }
    // console.log(data)
    await productModel.createWithImage(data, images)
    res.redirect('/')
  } catch (e) {
    next(e)
  }
}

async function productDelete (req, res, next) {
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

export default { productsDataGet, productCreateGet, productCreatePost, productDelete }
