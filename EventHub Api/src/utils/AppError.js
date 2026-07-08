class AppError extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.name = "AppError";
        Error.captureStackTrace(this, this.constructor);

    }
}

module.exports = AppError;