const Order = require("../models/Order");

exports.addOrder = async (req, res) => {
    try {
        const { products, total, shippingAddress, paymentMethod } = req.body;
        const newOrder = new Order({ products, total, shippingAddress, paymentMethod, user: req.user.id });
        await newOrder.save();
        res.status(201).json({ msg: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ msg: 'Failed to place order', error: error.message });
    }
};

exports.allOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate({
            path: 'user',
            model: 'User',
            select: 'name'
        })
        .populate({
            path: 'products.product',
            model: 'Product',
            select: 'title price'
        });
        
        if (orders.length === 0) {
            return res.status(404).json({ msg: 'No orders found' });
        }
        res.status(200).json({ msg: 'Orders retrieved successfully', orders });
    } catch (error) {
        res.status(400).json({ msg: 'Failed to retrieve orders', error: error.message });
    }
};

exports.myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        .populate({
            path: 'products.product',
            model: 'Product',
            select: 'title price'
        });

        if (orders.length === 0) {
            return res.status(404).json({ msg: 'No orders found for this user' });
        }
        res.status(200).json({ msg: 'User orders retrieved successfully', orders });
    } catch (error) {
    res.status(400).json({ msg: 'Failed to retrieve user orders', error: error.message });
    }
};

exports.oneOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
        .populate({
            path: 'products.product',
            model: 'Product',
            select: 'title price'
        });

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        res.status(200).json({ msg: 'Order retrieved successfully', order });
    } catch (error) {
        res.status(400).json({ msg: 'Failed to retrieve order', error: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

        if(!validStatuses.includes(status)) {
            return res.status(400).json({ msg: 'Invalid status value' });
        };

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        if (!req.user.isAdmin) {
            return res.status(403).json({ msg: 'Access denied' });
        };

        order.status = status;
        await order.save();

        const updatedOrder = await Order.findById(id)
        .populate({
            path: 'user',
            model: 'User',
            select: 'name'
        })
        .populate({
            path: 'products.product',
            model: 'Product',
            select: 'title price'
        });
        res.status(200).json({ msg: `Order status updated to ${status}`, order: updatedOrder });
    } catch (error) {
        res.status(400).json({ msg: 'Failed to update order status', error: error.message });
    }
};