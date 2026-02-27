import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



// FUNCTION FOR SIGNUP
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










//FUNCTIOn FOR signin OF USERS
export const signin= async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({success: false, message: "Both email and password are required"});
    }


    try{

        const user =await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: "Invalid email. User doesn't exist"});
        }

        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid password"})
        }


        //yahan agar cide pohancha mean user exist and password is correct and now we will generate token and using it user will be authenticated and logged in website
        const token=jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '7d'}) ///user.id jo bnti hai db main like ._id
        

        //now we have to send this token to user in res and  we will send bby cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

       
        return res.status(200).json({ success: true, message: "User logged in successfully" });



    }catch(err){
        res.json(err)
       
    }
}
