const errors = (err, req, res , next) => {
    res.status(err.statusCode).send({
        message: err.message
    })
}

module.exports = errors;