const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const bcrypt=require("bcryptjs");

// const AppError = require("../middleWare/errorMiddleware");

const protect = asyncHandler(async (req, res, next) => {
  try {
    // const token = req.headers.cookie.substring(6);
    const token = req.headers.authorization;
    // console.log("Bearer ",token);
    // console.log(req.headers);
    // console.log(req.cookies);

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized, please login");
  }

});

module.exports = protect;
