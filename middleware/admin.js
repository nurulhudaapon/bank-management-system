const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    let token = req.cookies.token;
        
    if (!token) return res.status(403).send('No token provided');

    
    try {
        const decoded = jwt.verify(token, 'pk');
        req.admin = true;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid Token');
    }
}