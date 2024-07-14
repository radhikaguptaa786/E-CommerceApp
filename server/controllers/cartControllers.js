import cartModel from "../models/cartModel.js";
import Cart from "../models/cartModel.js";
import { mongo } from "mongoose";
// Get the current user's cart
export const getCartController = async (req, res,next) => {
  try {
    const user=req.body;
    console.log(req.params)
    const userEmail=user.email
    console.log(userEmail)
    const cart = await Cart.find();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    console.log("cart found")
    console.log("cart",cart)
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to the cart
export const addItemToCartController = async (req, res, next) => {
  try {
    const productToAdd=req.body.product
    const user=req.body.user.user
    console.log(user)
    const productId = productToAdd._id;
    const quantity = 1;
    if (!productToAdd || !user) {
      return res.status(400).json({ message: "Product and user details are required" });
    }
    const userEmail = user.email;
    // console.log(productId,userEmail)
  
    let cart = await Cart.findOne({ userEmail });
    if (!cart) {
      const newCart = new Cart({
        products: [{ id: productId, quantity }],
        userEmail
      });
      const createdCart = await newCart.save();
      console.log("cart created")
      return res.json({ success: true, createdCart });
    }
 // Cart exists, check if product already exists
 const productIndex = cart.products.findIndex(p => p.id.equals(productId));
    
 if (productIndex > -1) {
   // Product exists, update quantity
   cart.products[productIndex].quantity += quantity;
 } else {
   // Product does not exist, add new product
   cart.products.push({ id: productId, quantity });
 }

 const savedCart = await cart.save();
 console.log("Item added to existing cart")
 res.json(savedCart);
  } catch (error) {
    console.error("Something wrong while adding to cart, error");
    res.status(500).json({ message: error.message });
  }
};

// Remove item from the cart
export const removeItemFromCartController = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
