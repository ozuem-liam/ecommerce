const { getMaxListeners } = require("../models/Product");
const Product = require("../models/Product");
const transporter = require("../utils/EmailClient");

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

const sendProduct = (req, res) => {
  try {
    const data = req.body;
    const mailOption = {
      from: "ORDER REQUEST <ozuemdw@gmail.com>",
      to: "testwilliamscode@gmail.com",
      subject: "YOU HAVE ORDER REQUEST",
      text: `<h3>${JSON.stringify(data)}</h3>`,
    }
    transporter.sendMail(mailOption, (err, data) => {
      if (err) {
        return err
      } else {
        return data
      }
    })
    res.status(200).send("Email sent Successfully");
  } catch (error) {
    res.status(404).json({ messgae: "Server Error", error: error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  sendProduct,
};
