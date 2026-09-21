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

module.exports = {
    register
};