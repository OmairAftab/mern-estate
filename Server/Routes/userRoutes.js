import express from "express";
import { deleteUserController, updateUserController } from "../Controllers/userController.js";
import { verifyTheToken } from "../MiddleWare/VerificationMW.js";


const router=express.Router();

router.get('/test',(req,res)=>{
    res.send("MIKE CHCEK")
})


router.post('/update/:id' , verifyTheToken, updateUserController)

router.post('/delete/:id', verifyTheToken ,deleteUserController)

export default router;