const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const admins = require("../config/admin");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const storage = multer.diskStorage({
  destination: "./backend/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 65,
  },
  fileFilter: fileFilter,
}).single("image");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = admins.filter((admin) => {
      return (admin.email = email);
    })[1];

    if (!admin) {
      const message = "This admin does not exist";
      res.json({ message });
    }
    if (password !== admin.password) {
      const message = "Invalid credentials";
      res.json({ message });
    }
    jwt.sign({ admin }, "secretkey", (err, token) => {
      res
        .set({
          Authorization: "Bearer " + token,
          "Access-Control-Expose-Headers": "authorization",
        })
        .json({
          message: "Success",
          token,
          email: admin.email,
          password: admin.password,
        });
    });
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

const getAllProducts = (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const products = await Product.find({});

        res.json(products);
      }
    });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error", error: error });
  }
};

const getProductById = async (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
      }
    });
  } catch (error) {
    res.status(404).json({ messgae: "Server Error", error: error });
  }
};

const postProduct = async (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        upload(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
            res.json({ message: "Error Happend", error: err });
          } else {
            const result = await cloudinary.uploader.upload(req.file.path);
            const product = new Product({
              name: req.body.name,
              description: req.body.description,
              price: req.body.price,
              countInStock: req.body.countInStock,
              image: result.secure_url,
              cloudinary_id: result.public_id,
            });
            product.save();
            res.status(201).send({
              message: "Created product successfully",
              authData,
            });
          }
        });
      }
    });
  } catch (error) {
   res.status(500).json({ messgae: "Server Error", error: error });
  }
};

const updateProductById = async (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const product = await Product.findByIdAndUpdate(req.body.id);

        res.status(200).json({
          message: "Product updated",
          product,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error", error: error });
  }
};

const deleteProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    await product.remove();
    res.status(200).json({
      message: "Product deleted",
      request: {
        type: "DELETE",
        url: "http://localhost:5000/api/products",
      },
    });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error", error: error });
  }
};

module.exports = {
  loginAdmin,
  getAllProducts,
  getProductById,
  postProduct,
  updateProductById,
  deleteProductById,
};
