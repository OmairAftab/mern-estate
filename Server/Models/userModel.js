import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps: true});
// by using timestamps: true Mongoose automatically adds two extra fields to your documents: createdAt AND updatedAt



//make model
const userModel=mongoose.model('user' ,userSchema);

export default userModel;