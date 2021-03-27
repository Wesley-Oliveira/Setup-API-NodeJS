require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN,
};
