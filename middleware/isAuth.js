const jwt = require('jsonwebtoken');
const User = require('../models/User'); 


const isAuth = async (req, res, next) => {
    try {
        const token = req.header('authorization');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); 

        const foundUser = await User.findOne({ _id: decoded.id });

        if (!foundUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = foundUser;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};


module.exports = isAuth;