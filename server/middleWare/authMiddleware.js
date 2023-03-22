const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const User = require("../models/userModel");
// const bcrypt=require("bcryptjs");

// const AppError = require("../middleWare/errorMiddleware");

const protect=asyncHandler(async (req,res,next)=>{
    try{
        console.log("protect")
        const token=req.cookies.token;
        console.log(req.cookies);
        console.log("token=" +token);
        
        if(!token){
            res.status(401);
            throw new Error("Not authorized, please login");
        }

        //verify token
        const verified=jwt.verify(token,process.env.JWT_SECRET);

        console.log("JWT=" +verified);
        
        //get user id from token
        const user=await User.findById(verified.id).select("-password");
        console.log("user=" +user);
        

        if(!user){
            res.status(401);
            throw new Error("User not found");
        }
        req.user=user;
        next();  


    }catch(error){
        console.log(error);
        
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});

module.exports=protect;