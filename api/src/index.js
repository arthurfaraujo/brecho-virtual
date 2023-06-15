// Carregamento de  módulos
import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
// Rotas
import pages from './routes/Pages.js'
import register from './routes/Register.js'
import data from './routes/Data.js'
import { errors } from './routes/Error.js'

// uso de variáveis de ambiente com dotenv
dotenv.config()

// Criação de constantes importantes
const PORT = process.env.PORT || 3000
const server = express()

// Configurações
// configura o json do express
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// mostra o que está acontecendo no servidor
server.use(morgan('tiny'))

// define a pasta de arquivos estáticos
server.use(express.static('public'))

// define o ejs como motor de visualização de páginas
server.set('view engine', 'ejs')

// Rotas
// acesso a páginas inicial e de cadastro
server.use('/', pages)

// cadastros
server.use('/cadastro', register)

// dados
server.use('/data', data)

// ERROS
server.use(errors)

// Botando o servidor pra rodar e escutar na porta PORT
server.listen(PORT, () => {
  console.log(`Server is running and listening at port ${PORT}`)
})
