var express = require('express');
const { getAllProducts } = require('../controllers/productController');
var router = express.Router();

router.get("/products", getAllProducts)

module.exports=router