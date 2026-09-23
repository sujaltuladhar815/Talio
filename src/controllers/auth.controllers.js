const authServices = require('../services/auth.services');
const jwt = require('../utils/jwt');

const register = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await authServices.register(userData);
        const token = jwt.generateToken(loginUser);

        res.cookie('authToken', token, {
            maxAge: 86400000, // 1 day in milliseconds
        })

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const loginData = req.body;
        const loginUser = await authServices.login(loginData);
        const token = jwt.generateToken(loginUser);

        res.cookie('authToken', token, {
            maxAge: 86400000, // 1 day in milliseconds
        })

        res.status(200).json({ ...loginUser, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};