const productModel = require("../models/productModel");
const { search } = require("../utils/apifeatures");

//create product-admin
exports.createProduct = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const product = await productModel.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  try {
     const Search = search(req.query)

    const products = await productModel.find(Search);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update product--admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runvalidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete product

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single product
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//create new review or update new review
exports.createProductReview = async (req,res,next)=>{
  try {
    const {rating, comment, productId} = req.body
  const review={
      user:req.user._id,
      name:req.user.name,
      rating : Number(rating),
      comment
  }
  
  const product = await productModel.findById(productId)

  const isReviewed = product.reviews.find(
    (rev)=>
      rev.user.toString()=== req.user._id.toString()
  )

  if(isReviewed){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString()=== req.user._id.toString())
        (rev.rating = rating) ,
        (rev.comment = comment)
    })
  }
  else{
    product.reviews.push(review)
    product.numOfReviews=product.reviews.length
  }

  let avg = 0;
  product.reviews.forEach(rev=>{
    avg+=rev.rating
  })
  
  product.ratings=avg/product.reviews.length

  await product.save({validateBeforeSave:false})

  res.status(200).json({
    success:true,
  })
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }

}

//get all reviews of a product
exports.getProductReviews = async (req,res,next)=>{
  try {
    const product = await productModel.findById(req.query.id)
  
  if(!product){
    return res.status(404).json({
      success:false,
      message:"product not found"
    })
  }

  res.status(200).json({
    success:"true",
    reviews:product.reviews
  })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

// exports.deleteReview = async (req , res)=>{
//   const product = await productModel.findById(req.query.productId)

//   if(!product){
//     return res.status(404).json({
//       success:false,
//       message:"product not found"
//     })
//   }

//   const reviews = product.reviews.filter((rev)=>{rev._id.toString()!== req.query.id.toString()})

//   let avg = 0;
//   reviews.forEach(rev=>{
//     avg+=rev.rating
//   })
  
//   const ratings=avg/reviews.length

//   const numOfReviews = reviews.length

//   await productModel.findByIdAndUpdate(req.query.productId,{
//     reviews,
//     ratings,
//     numOfReviews
//   },{
//     new:true,
//     runValidators:true,
//     useFindAndModify:false
//   })
// }

