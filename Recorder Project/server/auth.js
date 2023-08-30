const jwt = require('jsonwebtoken');
const login = require('./module/loginSchema');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.Cookie;
        const verifyUser = jwt.verify(token, 'reacttest');

        const user = await login.findOne({ email: verifyUser.email });
        next()
    } catch (err) {
        res.status(401)
        .json('/login');
    }

}

module.exports = auth;