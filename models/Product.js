const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;