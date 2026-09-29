const authServices = require('../services/auth.services');
const jwt = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');

const cookieOptions = { maxAge: 86400000, httpOnly: true };

const register = catchAsync(async (req, res) => {
    const newUser = await authServices.register(req.body);
    const token = jwt.generateToken({ id: newUser.id, role: newUser.role });

    res.cookie('authToken', token, cookieOptions);
    res.status(201).json({message: 'User registered successfully'});
});

const login = catchAsync(async (req, res) => {
    const loginUser = await authServices.login(req.body);
    const token = jwt.generateToken({ id: loginUser.id, role: loginUser.role });

    res.cookie('authToken', token, cookieOptions);
    res.status(200).json({message: 'User logged in successfully'});
});

const logout = (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    login,
    logout
};
