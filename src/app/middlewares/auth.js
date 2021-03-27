const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/authConfig');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token does not exist' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};