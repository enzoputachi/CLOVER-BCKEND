import express from 'express';
import { getCurrentUserProfile, login, logout, register } from '../controllers/userAuthController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(register)

router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authenticate, getCurrentUserProfile)


export default router;