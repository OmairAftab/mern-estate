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
const corsOrigin = process.env.FRONTEND_URL || process.env.CLIENT_URL || true;
// Enable CORS for the frontend and allow credentials (cookies)
app.use(cors({ origin: corsOrigin, credentials: true,
}));
app.use(express.json()); //used when sending json data in raw in post and put methods in postman 
app.use(cookieParser());






// IMPORT USER ROUTES
import userRoutes from './Routes/userRoutes.js'
app.use('/api/user', userRoutes)



// IMPORT AUTHENTICATION ROUTES
import authRouter from './Routes/authRoutes.js'
app.use('/api/auth',authRouter)


// IMPORT LISTING ROUTES
import listingRouter from './Routes/listingRoutes.js'
app.use('/api/listing', listingRouter)




const port=process.env.PORT || 8000;

app.listen(port,()=>{console.log("Server Started")})
