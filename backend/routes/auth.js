import express from 'express'

import auth from '../middleware/auth.js'
import { register, login, logout, verify, raj_func } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/verify', auth, verify);

router.post('/raj/register', raj_func, register);
router.post('/raj/login', raj_func, login);

export default router;
