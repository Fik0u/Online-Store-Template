const express = require('express');
const { addOrder, allOrders, myOrders, oneOrder, updateStatus } = require('../controllers/order.controller');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');


const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Order route is working' })
});

// New order route
router.post("/addOrder", isAuth, addOrder);

//All orders route
router.get('/all', isAdmin, allOrders);

//User's orders route
router.get('/myOrders', isAuth, myOrders);

//Single order route
router.get('/:id', isAdmin, isAuth, oneOrder);

// Update order status route
router.put('/:id', isAdmin, updateStatus);

module.exports = router;