function errorMiddleware(err, req, res, next) {
    const status = err.statusCode || 500;

    res.status(status).json({
        error: {
            message: err.message,
            status
        }
    });
}

module.exports = errorMiddleware