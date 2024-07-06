import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    let token = req.body.Authorization || req.headers.authorization || req.cookies.Authorization
    token = token.replace("Bearer ", "");
    const decode = JWT.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorised Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin Panel",
      error,
    });
  }
};
