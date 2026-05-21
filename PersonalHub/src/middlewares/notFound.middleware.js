const AppError = require("../utils/appError")

const notFound = (req, res, next) => {
    next(
        new AppError("Not found", 404)
    )
}

module.exports = notFound