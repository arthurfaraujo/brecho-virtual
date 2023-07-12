import { Router } from 'express'
import { auth } from '../middlewares/AuthMiddleware.js'

const route = Router()

route.get('/', auth, (req, res) => {
  res.render('home')
})

route.delete('/', (req, res) => {
  res.json({ message: 'deletado' })
})

export default route
