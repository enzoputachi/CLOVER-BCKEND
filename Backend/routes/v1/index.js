import express from 'express';
import courseRoutes from './courseRoutes.js';
import userAuthRoutes from './userAuthRoutes.js';
import cartRoutes from './cartRoutes.js';

const router = express.Router();

app.use('/users', userAuthRoutes);
app.use('/courses', courseRoutes);
app.use('/carts', cartRoutes);

export default router;