import express from 'express';
import { addCourse } from '../controllers/courseController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { clearCart, getCart, removeCourse } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', authenticate, addCourse);
router.get('/', authenticate, getCart);
router.delete('/:courseId', authenticate, removeCourse);
router.delete('/', authenticate, clearCart)