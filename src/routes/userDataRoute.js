const userController = require("../controllers/userController")




/*****************************************************
* route-Controller*
* @description * route-Controller connection for get all data
* ****************************************************/

exports.userGetRoute = userController.userGet;




/*****************************************************
* route-Controller*
* @description * route-Controller connection for get all data using role filter 
* ****************************************************/

exports.userRoleFilter=userController.userRoleFilter