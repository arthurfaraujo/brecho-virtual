import { Router } from "express"
import userController from "../controllers/userController.js"
import { auth } from "../middlewares/AuthMiddleware.js"

const route = Router()

route.get("/acesso", userController.userAccessGet)

route.post("/cadastra", userController.userCreatePost)

route.post("/conecta", userController.userLoginPost)

route.get("/desconecta", auth, userController.userLogoutGet)

route.delete("/remove", auth, userController.userDelete)

route.get("/deseja/dados", auth, userController.userWishesDataGet)

route.get("/deseja", auth, userController.userWishesGet)

route.post("/deseja/:codProd", auth, userController.userWishCreatePost)

route.delete("/deseja/:codProd", auth, userController.userWishDelete)

route.get("/vende", auth, userController.userProductsGet)

export default route
