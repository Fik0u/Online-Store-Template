const express = require('express');
const { addToCart, getCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cart.controller');
const isAuth = require('../middleware/isAuth');


const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Cart route is working' });
});

// Add item to cart route
router.post('/addToCart', isAuth, addToCart);

// Get cart route
router.get('/getCart', isAuth, getCart);

// Clear cart route
router.put('/clearCart', isAuth, clearCart);

// Update item in cart route
router.put('/:itemId', isAuth, updateCartItem);

// Remove item from cart route
router.delete('/:itemId', isAuth, removeCartItem);


module.exports = router;