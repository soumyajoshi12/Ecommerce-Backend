const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "please login to access this resource",
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);
  next();
};

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
            return res.status(403).json({
                success:false,
                message:`role ${req.user.role} is not allowed to access this resource`
            })
        }
        next()
}
