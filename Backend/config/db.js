import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";


const connectwithRetry = async (retries = 5, delay = 5000) => {
    while (retries) {    
       try {
           await mongoose.connect(process.env.MONGODB_URL);
           console.log('successfully connected to database');
           return;
       } catch (error) {
           console.error(`Connection attempt failed: ${error.message}`);
           retries -= 1;
   
           if (retries === 0) {console.error('Max retries reached, Exiting...'), process.exit(1)};
   
           console.log(`Retrying in ${delay / 1000} seconds...`);
           await new Promise(resolve => setTimeout(resolve, delay));
           console.log('Done waiting');
           
       }}
   }

   export const connectDB = asyncHandler(connectwithRetry);