const userModel = require("../models/userModel")

exports.registerUser = async (req,res,next)=>{
    try {
        const {name,email,password}=req.body;
    const user = await userModel.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl"
        }
    })

    const token = user.getJWTToken()

    res.status(201).json({
        success:true,
        token
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}