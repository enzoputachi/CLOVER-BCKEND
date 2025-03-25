import express from 'express';
import courseRoutes from './courseRoutes.js';
import userAuthRoutes from './userAuthRoutes.js';
import cartRoutes from './cartRoutes.js';

const router = express.Router();

router.use('/users', userAuthRoutes);
router.use('/courses', courseRoutes);
router.use('/carts', cartRoutes);

export default router;