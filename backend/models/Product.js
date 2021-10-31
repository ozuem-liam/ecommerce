const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
        required: false
    },
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;