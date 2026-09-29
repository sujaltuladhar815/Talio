const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const auth = require("../middlewares/auth");

router.get("/", userController.getAllUsers);
router.get("/me", auth, userController.getMe);


module.exports = router;