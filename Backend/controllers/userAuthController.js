import asyncHandler from "../middlewares/asyncHandler.js";
import { loginService, registerService, updateCurrentUserProfile } from "../services/userAuthServices.js";
import { getCurrentUserService } from './../services/userAuthServices.js';


export const register = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new Error("Please fill all the inputs.");

    try {
        const userData = await registerService(name, email, password);

        res.status(201).json(userData)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export const login = asyncHandler( async(req, res) => {
    const { email, password} = req.body;

    if (!email || !password) throw new Error("Please fill all the inputs.");

    try {
       const userData = await loginService(email, password);
  
      res.status(200).json(userData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export const getCurrentUserProfile = asyncHandler(async(req, res) => {
    
    const userId = req.user?.id;
    
    if(!userId) {
        return res.status(401).json({ error: 'Unauthorized: user not logged in.'})
    }

    try {
        const userProfile = await getCurrentUserService(userId);
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'An error occurred while fetching the user profile.' });
    }
})

export const logout = asyncHandler(async(req, res) =>{
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).json({ message: "Already logged out" });
    }

    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out sccessfully"})
})

export const updateUserProfile = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const updateData = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: user not logged in.'})
    }

    try {
        const updatedUser = await updateCurrentUserProfile(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error: error.message})
    }
})