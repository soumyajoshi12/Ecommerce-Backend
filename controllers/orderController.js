const orderModel = require("../models/orderModel")


//create order
exports.createNewOrder = async (req,res,next)=>{
    try {
        const {shippingInfo,orderItem, paymentInfo, itemPrice, shippingPrice, taxPrice, totalPrice} = req.body

    const order = await orderModel.create({
        shippingInfo,
        orderItem,
        paymentInfo, 
        itemPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get single order
exports.getorderdetails = async (req,res,next)=>{
    const order = await orderModel.findById(req.params.id).populate("user","name email");

    if(!order){
        return res.status(404).json({
            success:false,
            message:"order not found with this id"
        })
    }

    res.status(200).json({
        success:true,
        order
    })
}

//get logged in user orders
exports.myOrders = async (req,res,next)=>{
    const orders = await orderModel.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
}

//get all orsers -admin
exports.allOrders = async (req,res,next)=>{
    const orders = await orderModel.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
}