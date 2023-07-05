import { Router } from 'express'
import brandController from '../controllers/brandController.js'

const route = Router()

route.get('/dados', brandController.brandDataGet)

export default route
