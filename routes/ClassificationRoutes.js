import { Router } from 'express'
import classificationController from '../controllers/classificationController.js'

const route = Router()

route.get('/dados', classificationController.classificationDataGet)

export default route
