const AppError = require('../utils/AppError');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        ...(err.details ? { details: err.details } : {}),
      },
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: {
        message: 'A record with this value already exists',
        code: 'DUPLICATE_KEY',
        details: err.keyValue,
      },
    });
  }

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => ({
      path: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      error: { message: 'Validation failed', code: 'VALIDATION_ERROR', details },
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: { message: `Invalid value for field '${err.path}'`, code: 'INVALID_ID' },
    });
  }

  console.error('[unhandled error]', err);
  return res.status(500).json({
    error: { message: 'Something went wrong', code: 'INTERNAL_ERROR' },
  });
}

module.exports = errorHandler;