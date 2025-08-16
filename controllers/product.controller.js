const Product = require("../models/Product");


// Add Product
exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body });
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        res.status(400).json({ message: "Error adding product", error: error.message });
    }
}; 

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const prodsList = await Product.find();

        res.status(200).json({ message: "Products retrieved successfully", prodsList });
    } catch (error) {
        res.status(400).json({ message: "Error retrieving products", error });
    }
}; 

// Get One Product
exports.oneProd = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product retrieved successfully", prod });
    } catch (error) {
        res.status(400).json({ message: "Error retrieving product", error });
    }
}; 

// Update Product
exports.editProd = async (req, res) => {
    try {
        const { id } = req.params;
        const changeProd = req.body;

        const prod = await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProd = await Product.findByIdAndUpdate(id, changeProd, { new: true });
        res.status(200).json({ message: "Product updated successfully", updatedProd });
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
}; 

// Delete Product
exports.deleteProd = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }

        const deletedProd = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully", deletedProd });
    } catch (error) {
        res.status(400).json({ message: "Error deleting product", error });
    }
}; 