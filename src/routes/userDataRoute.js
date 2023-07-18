const userController = require("../controllers/userController")




/*****************************************************
* route-Controller*
* @deprecated * route-Controller connection for get all data
* ****************************************************/

exports.userGetRoute = userController.userGet;




/*****************************************************
* route-Controller*
* @deprecated * route-Controller connection for get all data using role filter 
* ****************************************************/

exports.userRoleFilter=userController.userRoleFilter