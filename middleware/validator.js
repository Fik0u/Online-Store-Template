const {check, validationResult} = require('express-validator');

//Registration Validation
exports.registervalidation = () => [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please include a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
]

//Login Validation
exports.loginValidation = () => [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
]


// Validate
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json({ errors : errors.array() })
};