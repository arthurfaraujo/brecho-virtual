import { Router } from 'express'
import Clothes from '../database/models/clothes.js'

const rota = Router()

// acesso do front à parte de dados
// envia os produtos
rota.get('/produtos', async (req, res, next) => {
  try {
    // console.log(await Clothes.readAll());
    res.json(await Clothes.readAll())
  } catch (e) {
    next(e)
  }
})

export default rota
