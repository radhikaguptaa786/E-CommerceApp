import express from "express";
import { registerController,loginController ,testController} from "../controllers/authControllers.js";

import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing
// Register||Method POST
router.post("/register", registerController);

// Login || POST
router.post('/login',loginController)

// test routes
router.get('/test',requireSignIn,isAdmin,testController)

// protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router;
