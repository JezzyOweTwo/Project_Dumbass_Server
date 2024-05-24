const jwt = require('jsonwebtoken');

function checkAuth(req,res,next){
    try {
        const token = req.headers.authorization.split("Bearer ")[1];    // space is intentional in the .split, don't remove
        jwt.verify(token,process.env.JWT_KEY);
        next(); 
    } catch(err){
        return res.status(401).json({message:"Authentication Failed."});
    }
}

module.exports = checkAuth;