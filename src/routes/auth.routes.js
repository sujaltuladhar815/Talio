const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', auth, (req, res) => res.json(req.user));

module.exports = router;