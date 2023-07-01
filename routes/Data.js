import { Router } from 'express'
import productModel from '../models/productModel.js'
const rota = Router()

// acesso do front à parte de dados
// envia os produtos
rota.get('/produtos', async (req, res, next) => {
  try {
    // console.log(await productModel.readAll())
    res.json(await productModel.readAll())
  } catch (e) {
    next(e)
  }
})

export default rota
