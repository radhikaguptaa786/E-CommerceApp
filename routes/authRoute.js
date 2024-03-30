import express from "express";
import { registerController,loginController ,forgotPasswordController,testController} from "../controllers/authControllers.js";

import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing
// Register||Method POST
router.post("/register", registerController);

// Login || POST
router.post('/login',loginController)

// Forgot password
router.post('/forgot-password',forgotPasswordController)

// test routes
router.get('/test',requireSignIn,isAdmin,testController)

// protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

// protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router;
