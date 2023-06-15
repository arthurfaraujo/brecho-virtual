import { Router } from 'express'

const rota = Router()

// acesso à parte visual do sistema

rota.get('/', (req, res) => {
  res.render('home.ejs')
})

rota.get('/entrada', (req, res) => {
  res.render('entrada.ejs')
})

export default rota
