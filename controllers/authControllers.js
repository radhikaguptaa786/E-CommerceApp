import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address ,answer} = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Name is Required" });
    }
    if (!password) {
      return res.send({ message: "Email is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    // check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }
    // registration user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "user Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered",
      });
    }
    
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid PAssword",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// forgotPasswordController
export const forgotPasswordController=async (req,res)=>{
  try{
    const {email,answer,newpassword}=req.body
    if(!email)
    {
      res.status(400).send({message:'Email is required'})
    }
    if(!answer)
    {
      res.status(400).send({message:'Answer is required'})
    }
    if(!newpassword)
    {
      res.status(400).send({message:'New Password is required'})
    }
    // check
    const user=await userModel.findOne({email,answer})
    if(!user)
    {
      return res.status(404).send({
        success:false,
        message:'wrong Email or answer'
      })
    }
    const hashed=await hashPassword(newpassword)

    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success:true,
      message:'Password Reset Successfully',
    });
  }catch(error)
  {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'something Went wrong',
      error
    })
  }
}
// test controller
export const testController = (req, res) => {
  res.send("protected Route");
  console.log("protect route");
};
