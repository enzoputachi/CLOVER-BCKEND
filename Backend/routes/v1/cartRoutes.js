import express from 'express';
import { authenticate } from '../../middlewares/authMiddleware.js';
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../../controllers/cartController.js";

const router = express.Router();

router.post('/add', authenticate, addToCart);
router.get('/', authenticate, getCart);
router.delete('/:courseId', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart) 

export default router;