
import { cartModel } from './../models/cartModel.js';

export const findOrCreateCart = async(userId) => {
    let cart = await cartModel.findeOne({ userId });
    if (!cart) {
        cart = await cartModel.create({ userId, courseId: [], totalAmount: 0 });
    }

    return cart;
}

export const addCourseService = async(userId, courseId, price ) => {
    let cart = findOrCreateCart(userId)

    // Prevent adding the same course twice
    if(cart.courseId.includes(courseId)) {
        throw new Error('Course already in cart.');
    }

    cart.courseId.push(courseId);
    cart.totalAmount += price; //Update totalAmount

    await cart.save();
    return cart;
}

export const removeCourseService = async(userId, courseId, price) => {
    let cart = findOrCreateCart(userId);

    cart.courseId = cart.courseId.filter(course => course !== courseId);
    cart.courseId -= price;

    await cart.save();
    return cart;
};

export const clearCartService = async(userId) => {
    let cart = await findOrCreateCart(userId);
    cart.courseId = [];
    cart.totalAmount = 0;

    await cart.save();
    return cart;
}

// Get cart by userId
export const getCartByUserId = async(userId) => {
    return await findOrCreateCart(userId)
}