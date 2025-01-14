import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/hashUtils.js";
import { generateToken } from "../utils/tokenUtils.js";


export const registerService = async(fullname, email, password) => {
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) throw new Error('User already exists');

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ fullname, email, password: hashedPassword});

        await newUser.save()

        const token = generateToken(newUser._id);

        return {
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        };
    } catch (error) {
        console.error('Error in register:', error.message);
        throw new Error(error.message)
    }
};


export const loginService = async(email, password) => {
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) throw new Error('Invalid email or password');

        const isPasswordValid = await comparePassword(password, existingUser.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = generateToken(existingUser._id);

        return {
            _id: existingUser._id,
            fullname: existingUser.fullname,
            email: existingUser.email,
            isAdmin: newUser.isAdmin,
        };
    } catch (error) {
        console.error('Error during sigin-in:', error.message);
        throw new Error(error.message || 'Internal server error');
    }
}