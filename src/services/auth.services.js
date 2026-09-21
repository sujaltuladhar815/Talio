const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (userData) => {

    const hashPassword = await bcrypt.hash(userData.password, 10);
    
    return await User.create({
        name : userData.name,
        username : userData.username,
        email : userData.email,
        password : hashPassword,
        phone : userData.phone,
        avatar : userData.avatar,
        headline : userData.headline,
        bio : userData.bio,
        location : userData.location
    })
};

module.exports = {
    register,
};