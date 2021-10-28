const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const {
  getAllProducts,
  getProductById,
  postProduct,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

//@description GET all products from db
//@route GET /api/products
//@access Public
router.get("/", getAllProducts);

//@description GET any products by id from db
//@route GET /api/products/:id
//@access Public
router.get("/:id", getProductById);

//@description POST any products
//@route POST /api/products
//@access Private
router.post("/admin/products", upload.single("image"), postProduct);

//@description PATCH any products by id from db
//@route PATCH /admin/products/:id
//@access Private
router.patch("/admin/products/:id", updateProductById);

//@description DELETE any products by id from db
//@route Delete /admin/products/:id
//@access Private
router.delete("/admin/products/:id", deleteProductById);

module.exports = router;
