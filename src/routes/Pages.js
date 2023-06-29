import { Router } from 'express'

const rota = Router()

// acesso à parte visual do sistema

rota.get('/', (req, res) => {
  res.render('home')
})

rota.get('/entrada', (req, res) => {
  res.render('entrada')
})

export default rota
