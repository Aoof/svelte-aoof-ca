import express from 'express'

import auth from '../middleware/auth.js'
import { register, login, logout, verify } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/verify', auth, verify);

export default router;
