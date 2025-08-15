const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { registervalidation, validate, loginValidation } = require('../middleware/validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Test Route is on !' });
});

// Register Route
router.post('/register', registervalidation(), validate, register);

// Login Route
router.post('/login', loginValidation(), validate, login);

// Current User Route
router.get('/current', isAuth, (req, res) => {
    res.json(req.user)
});


module.exports = router;