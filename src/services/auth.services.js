const User = require('../models/User');
const bcrypt = require('bcrypt');

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
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: hashPassword,
        phone: userData.phone,
        avatar: userData.avatar,
        headline: userData.headline,
        bio: userData.bio,
        location: userData.location
    });

    return toPublicUser(user);
};

const login = async (loginData) => {
    const user = await User.findOne({ email: loginData.email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    if (user.status === 'suspended') {
        throw new Error('Account suspended');
    }
    return toPublicUser(user);
};

module.exports = { register, login };