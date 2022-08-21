const kenex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")


class UserAvatarControllers {
    async update(request,response){
        const user_id = request.user.id
        const avatarFilename = request.file.filename

        const diskStorage = new DiskStorage()

        const user = await kenex("users").where({ id: user_id }).first()

        if (!user){
            throw new AppError("somente usuarios autenticados pode mudar a foto", 401)
        }

        if(user.avatar){
            await diskStorage.deleFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        user.avatar = filename
        await kenex("users").update(user).where({ id: user_id })

        return response.json(user)
    }
}

module.exports = UserAvatarControllers