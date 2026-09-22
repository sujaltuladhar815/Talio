const authServices = require('../services/auth.services');

const register = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await authServices.register(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const loginData = req.body;
        const loginUser = await authServices.login(loginData);
        res.status(200).json(loginUser);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};