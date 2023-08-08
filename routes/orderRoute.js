const express = require("express")
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")
const { createNewOrder, myOrders, getorderdetails } = require("../controllers/orderController")

router.post("/order/new",isAuthenticatedUser , createNewOrder);
router.get("/order/:id",isAuthenticatedUser , authorizeRoles("admin"), getorderdetails)
router.get("/order/me",isAuthenticatedUser , myOrders) 



module.exports = router