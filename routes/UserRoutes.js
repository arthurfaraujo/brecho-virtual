import { Router } from 'express'
import userController from '../controllers/userController.js'
import { auth } from '../middlewares/AuthMiddleware.js'

const route = Router()

route.get('/acesso', userController.userAccessGet)

route.post('/cadastra', userController.userCreatePost)

route.post('/conecta', userController.userLoginPost)

route.get('/desconecta', userController.userLogoutGet)

route.delete('/remove', userController.userDelete)

route.get('/deseja', auth, userController.userWishesGet)

route.post('/deseja/:codProd', auth, userController.userWishCreatePost)

export default route
