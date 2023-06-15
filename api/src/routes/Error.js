import { Router } from 'express'

export const errorHandlers = Router()

// classe de erros específica para erros http
export class HTTPError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

// Manipular erros sem quebrar o servidor
// 404
errorHandlers.use((req, res, next) => {
  res.status(404).json({ message: 'Página não encontrada!' })
})

// Outros
errorHandlers.use((err, req, res, next) => {
  console.error(err.stack)
  if (err && err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message })
  } else {
    res.status(500).json({ message: 'Algo deu muito errado!' })
  }
})

export default { errorHandlers, HTTPError }
