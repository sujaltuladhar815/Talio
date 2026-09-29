const userService = require("../services/user.services");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
});

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getMe(req.user.id);
  res.status(200).json(user);
});

module.exports = {
  getAllUsers,
  getMe,
};
