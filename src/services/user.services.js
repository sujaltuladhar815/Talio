const User = require('../models/User');
const AppError = require('../utils/AppError');

const getAllUsers = async () => {
  return User.find();
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

module.exports = {
  getAllUsers,
  getUserById
};
