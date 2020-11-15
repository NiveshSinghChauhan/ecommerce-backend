const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verify(token, process.env.SECRET)
        req.AUTH = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'AUTH_FAILED'
        });
    }
}