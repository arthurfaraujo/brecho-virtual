import { Router } from 'express'
import userController from '../controllers/userController.js'

const route = Router()

route.get('/acesso', userController.userAccessGet)

route.post('/cadastra', userController.userCreatePost)

route.post('/conecta', userController.userLoginPost)

route.delete('/remove', userController.userDelete)

route.get('/desejos/:codUsr', userController.userWishsGet)

export default route
