const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    const token_admin = req.header('x-auth-token-admin');

    //check if no token
    if (!token && !token_admin) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        })
    }

    //Verify token
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded.user;

            next()

        }
        /* else if (token_admin) {
            const decoded_admin = jwt.verify(token_admin, process.env.JWT_SECRET_ADMIN);

            req.admin = decoded_admin.admin;

            next();
        } */
    } catch (error) {
        res.status(401).json({
            msg: 'Token invalid'
        })
    }
}