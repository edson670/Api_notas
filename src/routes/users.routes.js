const {Router} = require("express")
const multer = require('multer')
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarControllers = require("../controllers/UserAvatarControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const  usersController = new UsersController()
const userAvatarControllers = new UserAvatarControllers()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated,usersController.update )
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarControllers.update)

module.exports = usersRoutes