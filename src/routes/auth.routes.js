const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth');
const rolebasedAuth = require('../middlewares/roleBasedAuth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', auth, (req, res) => res.json(req.user));
router.get('/admin', auth, rolebasedAuth('user'), (req, res) => {
    res.json({ message: 'Welcome, admin!' });
});

module.exports = router;