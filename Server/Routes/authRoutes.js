import express from 'express'
import { googleController, signin, signup } from '../Controllers/authController.js';

const router=express.Router();

router.post('/signup',signup);
router.post('/signin', signin);

router.post('/google',googleController)
export default router