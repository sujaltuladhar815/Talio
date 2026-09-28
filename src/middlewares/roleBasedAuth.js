const AppError = require('../utils/AppError');

const rolebasedAuth = (role) => (req, res, next) => {
    if (req.user?.role !== role) {
        return next(new AppError('Access denied', 403));
    }
    next();
};

module.exports = rolebasedAuth;
