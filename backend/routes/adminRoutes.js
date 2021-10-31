const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const {
  getAllProducts,
  getProductById,
  postProduct,
  updateProductById,
  deleteProductById,
  loginAdmin,
} = require("../controller/adminController");

//@description GET all products from db
//@route GET /api/products
//@access Public
router.post("/login", loginAdmin);

//@description GET all products from db
//@route GET /api/products
//@access Public
router.get("/products", verifyToken, getAllProducts);

//@description GET any products by id from db
//@route GET /api/products/:id
//@access Public
router.get("/products/:id", verifyToken, getProductById);

//@description POST any products
//@route POST /api/products
//@access Private
router.post("/products", verifyToken, postProduct);

//@description PATCH any products by id from db
//@route PATCH /admin/products/:id
//@access Private
router.patch("/products/:id", verifyToken, updateProductById);

//@description DELETE any products by id from db
//@route Delete /admin/products/:id
//@access Private
router.delete("/products/:id", verifyToken, deleteProductById);

module.exports = router;
