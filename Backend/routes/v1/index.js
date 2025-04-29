import express from 'express';
import courseRoutes from './courseRoutes.js';
import userAuthRoutes from './userAuthRoutes.js';
import cartRoutes from './cartRoutes.js';
import paystackRoute from './paystackRoute.js'


const router = express.Router();

router.use('/users', userAuthRoutes);
router.use('/courses', courseRoutes);
router.use('/cart', cartRoutes);
router.use('/paystack', paystackRoute);

export default router;