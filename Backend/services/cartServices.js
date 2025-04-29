
import { cartModel } from './../models/cartModel.js';

export const findCart = async(userId) => {
    let cart = await cartModel.findOne({ userId }).populate("items");
    if (!cart) {
        throw new Error("Cart not found");
    }
    return cart;
}



export const addToCartService = async(userId, courseId, price ) => {
    validateCartParams(userId, courseId, price);

    let cart;

    try {
        cart = await findCart(userId)
    } catch (error) {
        cart = new cartModel({ userId, items: [courseId], total: price });
        await cart.save();
        return cart;
    }

    if (cart.items.some((item) => item._id.toString() === courseId)) {
        console.error("Course already exists:", courseId);        
        throw new Error(`Course alraedy in cart: ${courseId}`)
    }

    // Add the course to the cart and update the total
    cart.items.push(courseId);
    cart.total += price;

    await cart.save();
    return cart;
}

export const removeFromCartService = async(userId, courseId, price) => {
    
 
    validateCartParams(userId, courseId, price);

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.toString() !== courseId);

    if (cart.items.length === initialLength) {
        throw new Error('Course is not found in cart')
    }

    cart.total -= price;

    await cart.save();
    return cart;
};

export const clearCartService = async(userId) => {
    let cart = await cartModel.findOne({ userId })

    cart.items = [];
    cart.total = 0;

    await cart.save();
    return cart;
}

// Get cart by userId
export const getCartByUserId = async(userId) => {
    // Populate courseId so that each course object is fully fetched
    return await cartModel.findOne({ userId }).populate('items');
}


// Validator
const validateCartParams = (userId, courseId, price) => {
    // Validate userId    
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    // Validate courseId
    if (typeof courseId === "undefined" || courseId === null || (typeof courseId === "string" && !courseId.trim())) {
      throw new Error('Course ID is required and should not be empty');
    }
  
    // Validate price
    if (isNaN(price) || price < 0) {
        // console.log(price);        
        throw new Error('Valid price is required and cannot be a negative number');
    }
    
  };
  