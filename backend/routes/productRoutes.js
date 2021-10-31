const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  sendProduct,
} = require("../controller/productController");

//@description GET all products from db
//@route GET /api/products
//@access Public
router.get("/", getAllProducts);

//@description GET any products by id from db
//@route GET /api/products/:id
//@access Public
router.get("/:id", getProductById);

//@description Post products and send email
//@route Post /api/products/send
//@access Public
router.post("/send", sendProduct);

module.exports = router;
