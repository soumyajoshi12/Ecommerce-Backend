const mongoose=require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requied:[true,"please enter your name"],
        maxLength:[30,"name cant exceed 30 character"],
        minLength:[2,"name should have atleast 5 characters"]
    },
    email:{
        type:String,
        requied:[true,"please enter your email"],
        unique:true,
        validator:[validator.isEmail,"Please enter va;id email"]
    },
    password:{
        type:String,
        requied:[true,"please enter your password"],
        minLength:[8,"password should exceed 8 character"],
        select:false
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
    },
    role:{
        type:String,
        default:"user",
    },
    resetPassword:String,
    reserPasswordExpire: Date,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password= await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

module.exports = mongoose.model("user",userSchema)