const express = require("express")
const { registerUser , loginUser ,logout, forgotPassword, resetPassword, getUserDetails, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const router = express.Router()

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);
router.post("/password/forget",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/me",isAuthenticatedUser, getUserDetails);
router.put("/me/update",isAuthenticatedUser,updateUserProfile);
router.get("/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.get("/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getSingleUser);
router.put("/user/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole);
router.delete("/user/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

module.exports = router;