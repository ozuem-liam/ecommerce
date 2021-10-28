const Product = require("../models/Product");

// Public Controller
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ messgae: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

      res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ messgae: "Server Error", error: error });
  }
};





// Admin Controller

const postProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      image: req.file.path,
    });
    product.save();
    return res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          description: result.description,
          countInStock: result.countInStock,
          request: {
            type: "POST",
            url: "http://localhost:5000/api/products/" + result._id,
          },
        },
      });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ messgae: "Server Error", error: error });
  }
};

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body.id);

    res.status(200).json({
        message: "Product updated",
        product: product
    });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error", error: error });
  }
};

const deleteProductById = (req, res) => {
  try {
    Product.remove(req.params.id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Product deleted",
            request: {
                type: 'DELETE',
                url: "http://localhost:5000/api/products"
            }
        })
    });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error", error: error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProductById,
  deleteProductById,
};
