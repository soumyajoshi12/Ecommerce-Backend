const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

//create order
exports.createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItem,
      paymentInfo,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    const order = await orderModel.create({
      shippingInfo,
      orderItem,
      paymentInfo,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single order
exports.getorderdetails = async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "order not found with this id",
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

//get logged in user orders
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all orders -admin
exports.allOrders = async (req,res,next)=>{
    try {
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
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//update order status -admin
exports.updateOrderStatus = async (req,res,next)=>{
    try {
        const order = await orderModel.findById(req.params.id)

        if (!order) {
          return res.status(404).json({
            success: false,
            message: "order not found with this id",
          });
      }

    if(order.orderStatus ==="delivered"){
        return res.status(400).json({
            success:false,
            message:"order is already delivered"
        })
    }

    order.orderItem.forEach( async (o)=>{
        await updateStock(o.product,o.quantity)
    })

    order.orderStatus = req.body.status

    if(order.orderStatus === "delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave : false})

    res.status(200).json({
        success:true
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//updateStck function 

async function updateStock(id,quantity){
    const product = await productModel.findById(id)

    product.stock-=quantity

    await product.save({validateBeforeSave : false})

}

//delete order 
exports.deleteOrder = async (req,res,next)=>{
    try {
        const order = await orderModel.findById(req.params.id)

    if (!order) {
        return res.status(404).json({
          success: false,
          message: "order not found with this id",
        });
    }
    
    await order.remove()

    res.status(200).json({
        success:true
    })
    } catch (error) {
        res.status(500).json({
            success:true,
            message : error.message
        })
    }

}