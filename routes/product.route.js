const express = require('express');
const { addProduct, getProducts, oneProd, editProd, deleteProd } = require('../controllers/product.controller');

const router = express.Router();

// Test Route
router.get('/test',(req, res) => {
    res.status(200).json({ msg:'product route is working'});
});

// Add Product Route
router.post('/addProd', addProduct);

// All Products Route
router.get('/allProds', getProducts);

// Single Product Route
router.get('/:id', oneProd);

// Update Product Route
router.put('/:id', editProd);

// Delete Product Route
router.delete('/:id', deleteProd);


module.exports = router;