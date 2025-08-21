const Product = require('../models/Product');
const Cart = require('../models/Cart');

// Add item to cart 
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const item = cart.items.find(item => item.product.toString() === productId);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        const totalAmount = await Promise.all(
            cart.items.map(async(item) => {
                const product = await Product.findById(item.product);
                return product.price * item.quantity;
            })
        );
        cart.totalAmount = totalAmount.reduce((acc, curr) => acc + curr, 0 );
        await cart.save();
        res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(400).json({ message: 'Error adding item to cart', error: error.message });
    }
};

// Get cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.tatus(400).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        item.quantity = quantity;

        const totalAmount = await Promise.all(
            cart.items.map(async(item) => {
                const product = await Product.findById(item.product);
                return product.price * item.quantity;
            })
        );

        cart.total = totalAmount.reduce((acc, curr) => acc + curr, 0);
        await cart.save();
        res.status(200).json({ message: 'Cart item updated', cart });
    } catch (error) {
        res.status(400).json({ message: 'Error updating cart item', error: error.message });
    }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
const { itemId } = req.params;
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== itemId);

        const totalAmount = await Promise.all(
            cart.items.map(async(item) => {
                const product = await Product.findById(item.product);
                return product.price * item.quantity;
            })
        );

        cart.total = totalAmount.reduce((acc, curr) => acc + curr, 0);
        await cart.save();
        if (cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is now empty', cart });
        }
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(400).json({ message: 'Error removing item from cart', error: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.total = 0;
        await cart.save();
        res.status(200).json({ message: 'Cart cleared', cart });
    } catch (error) {
        res.status(400).json({ message: 'Error clearing cart', error: error.message });
    }
};