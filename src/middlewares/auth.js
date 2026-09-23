const jwt = require('../utils/jwt');

const auth = (req, res, next) => {
    try {
        const token =
            req.cookies?.authToken ||
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = jwt.verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;