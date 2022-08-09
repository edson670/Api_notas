

class AppError {
    message
    stattusCode

    constructor(message, stattusCode = 400){
        this.message = message
        this.stattusCode = stattusCode
    }
}

module.exports = AppError