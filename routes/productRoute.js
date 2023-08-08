var express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
var router = express.Router();

router.get("/products", getAllProducts);
router.post("/product/new",  isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetails);
router.put("/review",isAuthenticatedUser,createProductReview)
// router.delete("/review",isAuthenticatedUser,deleteReview)

module.exports = router;
