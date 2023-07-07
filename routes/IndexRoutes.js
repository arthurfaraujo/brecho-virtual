import { Router } from 'express'
import { auth } from '../middlewares/AuthMiddleware.js'

const route = Router()

route.get('/', auth, (req, res) => {
  res.render('home')
})

export default route
