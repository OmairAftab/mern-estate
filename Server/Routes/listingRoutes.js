import express from "express";
import { createListing , deleteListing, UpdateListing} from "../Controllers/listingController.js";
import { verifyTheToken } from "../MiddleWare/VerificationMW.js";


const router=express.Router();


router.post('/create', verifyTheToken,createListing)


 
//listing delete krne k liye jo show listings krne pe show hoti hai
router.delete('/delete/:id', verifyTheToken, deleteListing)




router.post('/update/:id', verifyTheToken, UpdateListing)

export default router;