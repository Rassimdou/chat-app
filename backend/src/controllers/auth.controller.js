import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateTokens} from "../lib/utils.js"
import express from "express";

import cloudinary from "../lib/cloudinary.js";


const router = express.Router()
 

export const signup = async (req,res)=>{
const {fullName,email,password} = req.body
try {
    if(!fullName || !email || !password){
        return res.status(400).json({message :"all fields are required"})
    }
    if(password.length<6){
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }
    const user = await User.findOne({email})
    if(user)return res.status(400).json({message : "Email already exists"})

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName,
            email,
            password : hashedPassword,
        })
         if(newUser){
            //generate jwt token here
            generateTokens(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                
            })

         }else{
            res.status(400).json({ message :"Invalid user data"})
         }
    } catch (error) {
    
}
   

};
export const login =async (req,res)=>{
    const {email , password} = req.body
    try {
        const user = await User.findOne({email})

    if(!user){
    return res.status(400).json({message :"Invalid credentials"});
}

    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message :"Invalid credentials"});
    }
    generateTokens(user._id,res)
    res.status(200).json({
        _id:user._id,
        fullName : user.fullName,
        email  : user.email,
        profilePic : user.profilePic,
    })
    } catch (error) {
        console.log("Error  in login controller", error.message);
        res.status(500).json({message :"Internal Server Error"});
    };

};
export const logout = (req,res)=>{
   try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });

    res.status(200).json({ message :"Logged out successfully"});
   } catch (error) {
    console.log("Error  in logout controller", error.message);
    res.status(500).json({message :"Internal Server Error"});
   }
};




export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; // Get the profile picture from the request body
    const userId = req.user._id; // Get the user ID from the protectRoute middleware

    // Validate the request payload
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Update the user's profile picture in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user data back to the client
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth = (req , res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message :"Internal Server Error"});
    }
}

