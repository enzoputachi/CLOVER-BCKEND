
import {
  addToCartService,
  clearCartService,
  getCartByUserId,
  removeFromCartService,
} from "../services/cartServices.js";
import asyncHandler from './../middlewares/asyncHandler.js';

export const addToCart = asyncHandler(async(req, res) => {
        console.log('Request Body:', req.body);

        const { courseId, price } = req.body;
        const userId = req.user?.id;

        const cart = await addToCartService(userId, courseId, price)
        res.status(200).json(cart)
})

export const removeFromCart = asyncHandler(async(req, res) => {
    console.log('Request Body:', req.body);
    const { price } = req.body;
    console.log("PRICE:", price);
    const { courseId } = req.params;
    console.log("COURSE ID:", courseId);
    const userId = req.user?.id;
    console.log("CUSER:", userId);

    const cart = await removeFromCartService(userId, courseId, price)
    res.status(200).json(cart);
})

export const clearCart = asyncHandler(async(req, res) => {
 
        const userId = req.user?.id;
        const cart = await clearCartService(userId);

        res.status(200).json(cart);
})

export const getCart = asyncHandler(async(req, res) => {
        
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
    }
    const userId = req.user?.id;
    const cart = await getCartByUserId(userId)
    
    res.status(200).json(cart);
})


