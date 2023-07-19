const jwt = require('jsonwebtoken');
const secretKey = "ThisismysecretKey"

exports.loginJwt= ()=>{
    return jwt.sign({userData},  secretKey, {expiresIn:"600s"});
}