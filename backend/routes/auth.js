const express = require('express');
const auth = require('../middleware/auth');
const { register, login, logout, verify } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/verify', auth, verify);

module.exports = router;
