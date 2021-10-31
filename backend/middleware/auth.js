const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Get auth header value
    try {        
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    } catch (error) {
        console.log("Debug",error);
    }
}

module.exports = verifyToken;