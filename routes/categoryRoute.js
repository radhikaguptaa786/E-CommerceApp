import express from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryControllers ,UpdatecategoryController,
    singleCategoryController,categoryController, deleteCategoryController} from "../controllers/categoryControllers.js";
const router=express.Router();

//routes
// create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryControllers)
// update category
router.put('/update-category/:id',requireSignIn,isAdmin,UpdatecategoryController)
//delete category
router.put('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)
// Get all Categories
router.get('/get-category',categoryController)

// single Category
router.get('/single-category/:slug',singleCategoryController)
// delete category
// update category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router