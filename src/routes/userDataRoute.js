const userController = require("../controllers/userController")




//get api

/*******************************************************************User Get route***************************************************************************************** */
exports.userGetRoute = userController.userGet;




/*******************************************************************User Filter role Get route************************************************************************/

exports.userRoleFilter=userController.userRoleFilter