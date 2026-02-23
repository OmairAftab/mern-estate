import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

app.listen(8000, () => {
  console.log("Server running on port 8000");
});