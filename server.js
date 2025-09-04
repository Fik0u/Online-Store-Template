const express = require('express');

require('dotenv').config(); 

// Database connection
const connectDB = require('./config/connectDB');

const app = express(); 

// Middleware
app.use(express.json());

connectDB(); 

//Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/product', require('./routes/product.route'));
app.use('/api/cart', require('./routes/cart.route'));
app.use('/api/order', require('./routes/order.route'));


const PORT = process.env.PORT || 3000;

// Server setup
app.listen(PORT, (err) => {
    err ? console.log("Server couldn't run", err) : console.log(`Server is running on port ${PORT}`);
})