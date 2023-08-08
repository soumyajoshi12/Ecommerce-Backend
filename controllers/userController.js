const userModel = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.create({
            name, email, password,
            avatar: {
                public_id: "this is a sample id",
                url: "profilepicUrl"
            }
        })

        sendToken(user, 201, res)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//login user

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please enter email and password"
            })
        }
        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        sendToken(user, 200, res)
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//logout user

exports.logout = async (req, res, next) => {

    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "logged out "
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}

//forget password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        //get resetPssword Token
        const resetToken = user.getResetPasswordToken;

        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

        try {
            await sendEmail({
                email: user.email,
                subject: `Ecommerce password recovery`,
                message
            });
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`
            })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false })
            return res.status(500).json({
                success: false,
                message: error.message
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//reset Password
exports.resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "reset password token is invalid or has been expired"
            })
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password does not match"
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save()
        sendToken(user, 200, res)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get user details

exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id)

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message:error.message
        })
    }
}

/////////update password

//update profile

exports.updateUserProfile=async(req,res,next)=>{
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email
        }
    
        const user = await userModel.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all users
exports.getAllUsers = async(req,res,next)=>{
    try {
        const users = await userModel.find()

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get single user
exports.getSingleUser = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.params.id)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//update user role-admin

exports.updateUserRole=async(req,res,next)=>{
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }
    
        const user = await userModel.findByIdAndUpdate(req.params.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Delete user - admin

exports.deleteUser=async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        await user.remove()

        res.status(200).json({
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
