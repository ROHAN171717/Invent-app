const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");

const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
}

//REGISTER USER
const registerUser=asyncHandler(async (req,res,next)=>{
    const { name, email, password } = req.body;

    //validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    if(password.length < 6){
        res.status(400);
        throw new Error("Password must be up to 6 characters");
    }

    //check if user email already exists
    const userExists=await User.findOne({ email })

    if(userExists){
        res.status(400);
        throw new Error("Email has already been registered");
    }

    //create new user
    const user=await User.create({
        name,
        email,
        password
    })

    //Generate Token
    const token=generateToken(user._id);
    console.log(token);
    

    //Sent HTTP only cookie
    res.cookie("token",token,{
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    });

    if(user){
        const { _id, name, email, photo, phone, bio }=user;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

//LOGIN USER
const loginUser=asyncHandler(async (req,res,next)=>{
    const { email, password } = req.body;

    //validation
    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password");
    }
    
    //check user exists or not
    const user=await User.findOne({email});

    if(!user){
        res.status(400);
        throw new Error("User not found, please signup");
    }

    //user exist, compare password
    const isPasswordCorrect=await bcrypt.compare(password,user.password);

    //generate token
    const token=generateToken(user._id);

    //Sent HTTP only cookie
    res.cookie("token",token,{
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    });

    if(user && isPasswordCorrect){
        const { _id, name, email, photo, phone, bio }=user;
        res.cookie("token",token);
        res.status(200).json({
            _id, name, email, photo, phone, bio, token
        })
    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
})

//LOGOUT USER
const logoutUser=asyncHandler(async (req,res,next)=>{
    res.cookie("token","",{
        path: "/",
        httpOnly: true,
        expires: new Date(0), //current second
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message:"Successfully Logged Out..."});
})

//GET USER DATA
const getUser=asyncHandler(async (req,res,next)=>{
    const user=await User.findById(req.user._id);
    
    if(user){
        const { _id, name, email, photo, phone, bio }=user;
        res.status(200).json({
            _id, name, email, photo, phone, bio
        })
    }else{
        res.status(400);
        throw new Error("User Not Found");
    }
})

//GET LOGIN STATUS
const getLoginStatus=asyncHandler(async (req,res,next)=>{
    const token=req.cookies.token;
    console.log("hello from login status")
    console.log("token from login status "+token)

    if(!token){
        return res.json(false);
    }

    //verify token
    const verified=jwt.verify(token,process.env.JWT_SECRET);
    
    if(verified){
        return res.json(true);
    }
    return res.json(false);
})

//UPDATE USER
const updateUser=asyncHandler(async (req,res,next)=>{
    const user=await User.findById(req.user._id);

    if(user){
        const { name, email, photo, phone, bio } = user;
        user.email=email;
        user.name=req.body.name || name;
        user.phone=req.body.phone || phone;
        user.bio=req.body.bio || bio;
        user.photo=req.body.photo || photo;

        const updatedUser=await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            photo:updatedUser.photo,
            phone:updatedUser.phone,
            bio:updatedUser.bio
        })
    }else{
        res.status(400);
        throw new Error("User Not Found");
    }
})

//CHANGE PASSWORD
const changePassword=asyncHandler(async (req,res,next)=>{
    const user=await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    //validation
    if(!user){
        res.status(400);
        throw new Error("User not found, please signup");
    }
    if(!oldPassword || !password){
        res.status(400);
        throw new Error("Please add old and new password");
    }
    if(password.length < 6){
        res.status(400);
        throw new Error("Password must be up to 6 character");
    }

    //check if old password match with password in DB
    const passwordIsCorrect=await bcrypt.compare(oldPassword,user.password);

    //save new password
    if(user && passwordIsCorrect){
        user.password=password;
        await user.save();
        res.status(200).send("Password change successful");
    }else{
        res.status(400);
        throw new Error("Old password is incorrect");    }
})

//FORGOT PASSWORD
const forgotPassword=asyncHandler(async (req,res,next)=>{
    const { email } = req.body;
    const user=await User.findOne({email});

    if(!user){
        res.status(404);
        throw new Error("User does not exist");
    }

    //Delete token if it exists in DB
    let token = await Token.findOne({userId: user._id});
    if(token){
        await token.deleteOne();
    }

    //Create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
    

    //Hash token before saving to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //Save token to DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), //30 minutes
    }).save();

    //Construct Reset Url
    const resetUrl=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    //Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 30minutes.</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards...</p>
        <p>Pinvent Team</p>
        `;
    const subject="Password Reset Request";
    const send_to=user.email;
    const sent_from=process.env.EMAIL_USERNAME;

    try{
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Reset Email Sent"});
    }catch(error){
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

//RESET PASSWORD
const resetPassword=asyncHandler(async (req,res,next)=>{
    const { password } = req.body;
    const { resetToken } = req.params;

    if(!password){
        res.status(400);
        throw new Error("Please provide new password");
    }
    if(password.length < 6){
        res.status(400);
        throw new Error("Password must be up to 6 character");
    }

    //Hash token, then compare to Token in DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //find Token in DB
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if(!userToken){
        res.status(404);
        throw new Error("Invalid or Expired Token");
    }

    //find user
    const user=await User.findOne({ _id: userToken.userId });
    user.password=password;
    await user.save();
    res.status(200).json({
        message:"Password Reset Successfull, Please Login"
    });
});


module.exports={ registerUser, loginUser, logoutUser, getUser, getLoginStatus, updateUser, changePassword, forgotPassword, resetPassword };