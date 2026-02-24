import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'




export const signup= async (req,res)=>{
    const {username,email,password} =req.body;

    if(!username || !email || !password){
        return res.status(400).json("Name , email and password are required")
    }

    try{

    //check if user already exist
    const existinguser=await UserModel.findOne({email});
    if(existinguser){
        return res.status(409).json({success: false, message: "User already exists"})
    }

    // hash the password
    const hashedpassword= await bcrypt.hash(password, 5); //await zrur lgana yahan wrna error aaye ga :   "message": "user validation failed: password: Cast to string failed for value \"Promise { <pending> }\" (type Promise) at path \"password\""


    //create new user and save it
    const newUser=new UserModel({username, email, password : hashedpassword})
    await newUser.save();


    return res.status(200).json({success: true, message: "User Registered successfully"})

    }
    catch(err){
        res.status(400).json({success: false, message: err.message || "An error occurred"})
    }
}