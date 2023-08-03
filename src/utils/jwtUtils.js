const jwt = require('jsonwebtoken');
// const secretKey = "
const fetchId = require("../services/userServices")
require('dotenv').config();



/*****************************************************
* JWT Token Generation
* ****************************************************/
exports.loginJwt= async (userData)=>{
    try{
        const dataId = await fetchId.findUsername(userData.username);
        if(dataId==null){
            return "username doesn't exist";
        }
        else{
            const token = jwt.sign({id:dataId.id, username:dataId.username},  process.env.SECRET_KEY, {expiresIn:"600sec"});
            return token;
        }
    }
    catch (e){
        console.log('error occur');
    }
}



    
/*****************************************************
* JWT Token Verification
* ****************************************************/
exports.verifyToken = (userToken)=>{
    try {
	const tokenVerification = jwt.verify(userToken, process.env.SECRET_KEY)
    return tokenVerification;
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return e;
		}
    }
}