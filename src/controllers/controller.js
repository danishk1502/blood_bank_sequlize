const userController = require('./userController');
const bloodBankController = require('./bloodBankController');




/*******************************************************************************************************************************************
 ************************************************** User Controllers from userController.js ************************************************
********************************************************************************************************************************************/



/*******************************************************************
 * Baasic user controllers
*******************************************************************/

exports.userRegister = userController.userRegister;
exports.userAuthentication= userController.userAuthentication;
exports.userDeletion = userController.userDeletion;
exports.userGet = userController.userGet;
exports.userUpdation = userController.userUpdation


/*******************************************************************
 * Baasic Data controllers
*******************************************************************/


exports.userRoleFilter =userController.userRoleFilter
exports.userUniqueGet = userController.userUniqueGet;


/*******************************************************************
 * Baasic Superuser controllers
*******************************************************************/

exports.requestAcception = userController.requestAcception
exports.pendingRequest = userController.pendingRequest
exports.requestDecline = userController.requestDecline





/*******************************************************************************************************************************************
************************************** blood bank Details Controllers from bloodBankServices.js ********************************************
********************************************************************************************************************************************/


exports.createBankDetails = bloodBankController.bloodBankDetails;