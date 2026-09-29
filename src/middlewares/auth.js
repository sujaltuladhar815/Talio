const jwt = require('../utils/jwt');
const AppError = require('../utils/AppError');

const auth = (req, res, next) => {
    const token =
        req.cookies?.authToken ||
        req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new AppError('Unauthorized', 401));
    }
    req.user = jwt.verifyToken(token);
    next();
};

module.exports = auth;
