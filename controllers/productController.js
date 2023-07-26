const productModel = require("../models/productModel");
const { search } = require("../utils/apifeatures");

//create product-admin
exports.createProduct = async (req, res) => {
  try {
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

   const Search = search(productModel.find() , req.query)
  //  const Filter = filter(productModel.find() , req.query)

  //  console.log(Search);
    const products = await productModel.find()
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
