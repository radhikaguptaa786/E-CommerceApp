import express from "express";
import { addItemToCartController, getCartController, removeItemFromCartController } from "../controllers/cartControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get the current user's cart
router.get('/getCart', requireSignIn, getCartController);

// Add item to the cart
router.post('/addto-cart', requireSignIn, addItemToCartController);

// Remove item from the cart
router.delete('/cart/:productId', requireSignIn, removeItemFromCartController);

export default router;
