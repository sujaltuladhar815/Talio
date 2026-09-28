const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
    next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

const normalizeError = (err) => {
    if (err instanceof AppError) return err;

    if (err.name === 'CastError') {
        return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    if (err.name === 'ValidationError' && err.errors) {
        const errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return new AppError('Validation failed', 400, errors);
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        return new AppError(`${field} already exists`, 409, [
            { field, message: `${field} already exists` },
        ]);
    }

    if (err.name === 'TokenExpiredError') return new AppError('Token expired', 401);
    if (err.name === 'JsonWebTokenError') return new AppError('Invalid token', 401);

    if (err.type === 'entity.parse.failed') return new AppError('Invalid JSON body', 400);
    if (err.type === 'entity.too.large') return new AppError('Request body too large', 413);

    const unknown = new AppError('Internal server error', 500);
    unknown.isOperational = false;
    unknown.original = err;
    return unknown;
};

const errorHandler = (err, req, res, next) => {
    const error = normalizeError(err);

    if (!error.isOperational || error.statusCode >= 500) {
        console.error(`[ERROR] ${req.method} ${req.originalUrl}`, error.original || err);
    }

    const body = {
        success: false,
        status: error.status,
        message: error.message,
    };
    if (error.errors) body.errors = error.errors;

    res.status(error.statusCode).json(body);
};

module.exports = { notFound, errorHandler };