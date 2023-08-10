const userController = require("../controllers/controller");

/*****************************************************
 * route-Controller*
 * @description * route-Controller for user Registration
 * ****************************************************/
exports.userRegisterRoute = userController.userRegister;

/*****************************************************
 * route-Controller*
 * @description * route-Controller for user Authentication
 * ****************************************************/
exports.userAuthenticationRoute = userController.userAuthentication;

/*****************************************************
 * route-Controller*
 * @description * route-Controller for user Deletion
 * ****************************************************/
exports.userDeletionRoute = userController.userDeletion;

/*****************************************************
 * route-Controller*
 * @description * route-Controller for user updation
 * ****************************************************/
exports.userUpdationRoute = userController.userUpdation;

exports.userAllRequests = userController.userAllRequests;
exports.userPendingRequests = userController.userPendingRequests;
exports.userAcceptedRequests = userController.userAcceptedRequests;
exports.logout = userController.logout;
