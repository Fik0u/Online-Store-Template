const jwt = require('jsonwebtoken');
const User = require('../models/User');


const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ msg: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (!foundUser.isAdmin) {
            return res.status(403).json({ msg: 'Access denied, admin only' });
        }

        req.user = foundUser;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Invalid token or server error', error: error.message });
    }
};

module.exports = isAdmin;