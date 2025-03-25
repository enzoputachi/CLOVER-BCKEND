import asyncHandler from './asyncHandler.js';
import jwt from 'jsonwebtoken';


const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.headers["authorization"]?.split(' ')[1];

  if(!token) return res.status(401).json({ error: 'Unauthorized: No token provided.' });

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); 
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401);
      throw new Error(`Not authorized, token failed: ${error.message}`);
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
  });
  
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

  export { authenticate, authorizeAdmin };