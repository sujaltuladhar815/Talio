const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (data) => {
    return jwt.sign(data, config.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };