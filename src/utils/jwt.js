const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (data) => {
    const token = jwt.sign(data, config.JWT_SECRET);
    return token;
};

module.exports = {
    generateToken,
};