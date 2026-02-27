import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
dotenv.config();


// SEPARATE DB FILE BNANE KI BJAE YAHAN E CONNECTION KR DIYA
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });





const app = express();
// Enable CORS for the frontend and allow credentials (cookies)
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true,
}));
app.use(express.json()); //used when sending json data in raw in post and put methods in postman 
app.use(cookieParser());






// IMPORT USER ROUTES
import userRoutes from './Routes/userRoutes.js'
app.use('/api/user', userRoutes)



// IMPORT AUTHENTICATION ROUTES
import authRouter from './Routes/authRoutes.js'
app.use('/api/auth',authRouter)




app.listen(8000, () => {
  console.log("Server running on port 8000");
});