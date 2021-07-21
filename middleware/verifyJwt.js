const config = require('../config/config');
const jwt = require('jsonwebtoken');
/*Middleware for verifying the JWT Token. */
 module.exports.verifyjwt = async (req, res, next) => {
    try {
        let tokenHeader = req.headers['authorization']
        if (tokenHeader) {
            let token = await tokenHeader.split(" ");
            let decoded = await jwt.verify(token[1], config.JWT_SECRET);
            if (decoded) {
                req.user = decoded.user;
                return next()

            } else {
                return res.status(401).json({ status: 401, error: 'This JWT Token is already expired.' })
            }
        } else {
            return res.status(401).json({ status: 401, error: 'JWT Token Required' })
        }
    } catch (error) {
        return res.status(401).json({ status: 401, error: 'JWT Token is expired.' })
    }
}