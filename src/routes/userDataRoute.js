const userController = require("../controllers/controller")




/*****************************************************
* route-Controller*
* @description * route-Controller connection for get all data
* ****************************************************/

exports.userGetRoute = userController.userUniqueGet;




/*****************************************************
* route-Controller*
* @description * route-Controller connection for get all data using role filter 
* ****************************************************/

exports.userRoleFilter=userController.userRoleFilter;