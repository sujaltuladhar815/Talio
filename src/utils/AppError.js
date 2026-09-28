/**
 * Custom operational error. Throw this anywhere (services, middlewares,
 * controllers) and the central error handler turns it into a JSON response.
 *
 *   throw new AppError('User not found', 404);
 *   throw new AppError('Validation failed', 400, [{ field: 'email', message: 'Invalid' }]);
 */
class AppError extends Error {
    constructor(message, statusCode = 500, errors = undefined) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
        this.errors = errors;          // optional field-level details
        this.isOperational = true;     // expected error (vs. a programming bug)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
