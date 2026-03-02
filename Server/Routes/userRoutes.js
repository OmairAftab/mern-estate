import express from "express";
import { updateUserController } from "../Controllers/userController.js";
import { verifyTheToken } from "../MiddleWare/VerificationMW.js";


const router=express.Router();

router.get('/test',(req,res)=>{
    res.send("MIKE CHCEK")
})


router.post('/update/:id' , verifyTheToken, updateUserController)

export default router;