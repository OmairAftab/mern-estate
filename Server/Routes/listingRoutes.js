import express from "express";
import { createListing } from "../Controllers/listingController.js";
import { verifyTheToken } from "../MiddleWare/VerificationMW.js";


const router=express.Router();


router.post('/create', verifyTheToken,createListing)

export default router;