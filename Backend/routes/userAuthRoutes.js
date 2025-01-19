import express from 'express';
import { login, logout, register } from '../controllers/userAuthController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(register)

router.post('/auth', login)
router.post('/logout', logout)


export default router;