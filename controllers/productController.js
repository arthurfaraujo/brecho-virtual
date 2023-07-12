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
    data.codUsrCr = data.codUsrCr || parseInt(req.cookies.codUsr)
    data.preco = parseFloat(data.preco.replace(',', '.'))
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
    if ((req.query.codUsrCr === 'null') || (req.cookies.codUsr === req.query.codUsrCr)) {
      const codProdString = req.query.codProd
      const codProd = parseInt(codProdString)

      const products = await productModel.remove(codProd)

      for (const image of products.Imagens) {
        await fs.unlink(`public/${image.urlImg}`)
      }

      res.status(200).redirect('/')
    } else {
      throw new Error('Você não tem permissão para apagar este produto!')
    }
  } catch (e) {
    if (e.message === 'Você não tem permissão para apagar este produto!') {
      e.code = 401
    } else {
      e.code = 400
    }
    next(e)
  }
}

async function productBuyPatch (req, res, next) {
  try {
    const codUsr = Number(req.cookies.codUsr)
    const codProd = Number(req.params.codProd)

    const product = await productModel.buy(codProd, codUsr)

    if (product) {
      res.status(200).redirect('/')
    } else {
      throw new Error('Erro ao realizar compra!')
    }
  } catch (e) {
    e.code = 400
    next(e)
  }
}

export default { productsDataGet, productCreateGet, productCreatePost, productDelete, productBuyPatch }
