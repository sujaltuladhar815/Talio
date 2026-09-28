const User = require('../models/User');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const toPublicUser = (user) => ({
    id: user._id,
    role: user.role,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    headline: user.headline,
    bio: user.bio,
    location: user.location
});

const register = async (userData) => {
    if (!userData?.password) {
        throw new AppError('Validation failed', 400, [
            { field: 'password', message: 'Password is required' },
        ]);
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: hashPassword,
        phone: userData.phone
    });

    return toPublicUser(user);
};

const login = async (loginData) => {
    if (!loginData?.email || !loginData?.password) {
        throw new AppError('Email and password are required', 400);
    }

    const user = await User.findOne({ email: loginData.email }).select('+password');
    if (!user) {
        throw new AppError('Invalid credentials', 401);
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
    }
    if (user.status === 'suspended') {
        throw new AppError('Account suspended', 403);
    }
    return toPublicUser(user);
};

module.exports = { register, login };
