import productModel from '../models/product.js'
import fs from 'node:fs/promises'

function productCreateGet(req, res) {
  res.render('productCreate')
}

async function productsDataGet(req, res, next) {
  try {
    // console.log(await productModel.readAll())
    res.json(await productModel.readAll())
  } catch (e) {
    next(e)
  }
}

async function productDetailGet(req, res, next) {
  try {
    const codProd = Number(req.params.codProd)
    const product = await productModel.readOne(codProd)
    if (product) {
      // res.json({ product })
      res.render('productDetail', { product })
    } else {
      throw new Error('Produto não encontrado!')
    }
  } catch (e) {
    e.code = 400
    next(e)
  }
}

async function productUserGet(req, res, next) {
  try {
    const codUsr = Number(req.cookies.codUsr)
    const userProducts = await productModel.readAllFromUser(codUsr)

    if (userProducts === []) {
      throw new Error('Você não cadastrou produto nenhum!')
    } else {
      res.json(userProducts)
    }
  } catch (e) {
    next(e)
  }
}

async function productEditGet(req, res, next) {
  try {
    const codProd = Number(req.params.codProd)
    const product = await productModel.readOne(codProd)

    res.render('editProduct', { product })
  } catch (e) {}
}

async function productEditPut(req, res, next) {
  try {
    const codProd = Number(req.params.codProd)
    const editedProduct = await productModel.update({ codProd, ...req.body })
    console.log(editedProduct)
    res.json(editedProduct)
  } catch (e) {
    next(e)
  }
}

async function productCreatePost(req, res, next) {
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

async function productDelete(req, res, next) {
  try {
    let product = await productModel.readOne(Number(req.query.codProd))
    if (req.cookies.codUsr === product.codUsrCr.toString()) {
      product = await productModel.remove(Number(req.query.codProd))

      for (const image of product.Imagens) {
        await fs.unlink(`public/${image.urlImg}`)
      }

      res.status(200).json({ message: 'Produto removido com sucesso!' })
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

async function productBuyPatch(req, res, next) {
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

export default {
  productsDataGet,
  productCreateGet,
  productDetailGet,
  productUserGet,
  productEditGet,
  productEditPut,
  productCreatePost,
  productDelete,
  productBuyPatch
}
