
import {
  addCourseService,
  clearCartService,
  getCartByUserId,
  removeCourseService,
} from "../services/cartServices.js";
import asyncHandler from './../middlewares/asyncHandler.js';

export const addCourse = asyncHandler(async(req, res) => {
    try {
        const { courseId, price } = req.body;
        const userId = req.user?.id;

        const cart = await addCourseService(userId, courseId, price)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export const removeCourse = asyncHandler(async(req, res) => {
    try {
        const { price } = req.body;
        const { courseId } = req.params;
        const userId = req.user?.id;

        const cart = await removeCourseService(userId, courseId, price)
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export const clearCart = asyncHandler(async(req, res) => {
    try {
        const userId = req.user?.id;
        const cart = await clearCartService(userId);

        res.staus(200).json(cart);
    } catch (error) {
        res.status(500).json({ error:  error.message })
    }
})

export const getCart = asyncHandler(async(req, res) => {
    try {
        const userId = req.user?.id;
        const cart = await getCartByUserId(userId)
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})