import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/hashUtils.js";
import { generateToken } from "../utils/tokenUtils.js";


export const registerService = async(name, email, password) => {
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) throw new Error('User already exists');

        const hashedPassword = await hashPassword(password);
        const newUser = new userModel({ name, email, password: hashedPassword});

        await newUser.save()

        const token = generateToken(newUser._id, newUser.isAdmin);

        return {
            token,
            user: { 
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            },
        };
    } catch (error) {
        console.error('Error in register:', error.message);
        throw new Error(error.message || 'An error occurred during registration')
    }
};


export const loginService = async(email, password) => {
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) throw new Error('Invalid email or password');

        const isPasswordValid = await comparePassword(password, existingUser.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = generateToken(existingUser._id, existingUser.isAdmin);

        return {
            token,
            user: { 
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            },
        };
    } catch (error) {
        console.error('Error during sigin-in:', error.message);
        throw new Error(error.message || 'Internal server error');
    }
}

// Service to get current user profile
export const getCurrentUserService = async (userId) => {
    const user = await userModel.findById(userId).select('-password');

    if(!user) throw new Error('User not found');

    return user;
}

// Service to update current user profile
export const updateCurrentUserProfile = async(userId, updateData) => {
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidator: true,
    });

    if(!updatedUser) throw new Error('User not found');

    return updatedUser.toObject();
};
