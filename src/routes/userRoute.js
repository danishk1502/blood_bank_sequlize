const userController = require("../controllers/userController")


/*****************************************************
* route-Controller*
* @deprecated * route-Controller for user Registration
* ****************************************************/
exports.userRegisterRoute = userController.userRegister;


/*****************************************************
* route-Controller*
* @deprecated * route-Controller for user Authentication
* ****************************************************/
exports.userAuthenticationRoute = userController.userAuthentication;


/*****************************************************
* route-Controller*
* @deprecated * route-Controller for user Deletion
* ****************************************************/
exports.userDeletionRoute = userController.userDeletion;

