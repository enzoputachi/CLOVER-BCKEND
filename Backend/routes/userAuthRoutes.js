import express from 'express';
import { getCurrentUserProfile, login, logout, register } from '../controllers/userAuthController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { updateCurrentUserProfile } from '../services/userAuthServices.js';

const router = express.Router();

router.post('/', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authenticate, getCurrentUserProfile)
router.patch('/profile', authenticate, updateCurrentUserProfile)


export default router;