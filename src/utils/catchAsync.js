/**
 * Wraps an async route handler / middleware so any rejected promise or thrown
 * error is forwarded to next() -> the central error handler.
 * Removes the need for try/catch in every controller.
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
