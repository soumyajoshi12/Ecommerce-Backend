const express = require("express")
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")
const { createNewOrder, myOrders, getorderdetails, allOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController")

router.post("/order/new",isAuthenticatedUser , createNewOrder);
router.get("/order/:id",isAuthenticatedUser , authorizeRoles("admin"), getorderdetails)
router.get("/order/me",isAuthenticatedUser , myOrders) 
router.get("/allorders", isAuthenticatedUser, authorizeRoles("admin"),allOrders)
router.put("/order/:id", isAuthenticatedUser, authorizeRoles("admin"),updateOrderStatus)
router.delete("/order:/id", isAuthenticatedUser, authorizeRoles("admin"),deleteOrder)



module.exports = router