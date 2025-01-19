import asyncHandler from "../middlewares/asyncHandler.js";
import { loginService, registerService } from "../services/userAuthServices.js";


export const register = asyncHandler(async(req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) throw new Error("Please fill all the inputs.");

    try {
        const userData = await registerService(fullname, email, password);

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

       res.cookie("jwt", userData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json(userData);
    } catch (error) {
        res.status(400).json({ message: error.message });
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