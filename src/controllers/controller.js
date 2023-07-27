const userController = require('./userController');
const bloodBankController = require('./bloodBankController');
const userAction = require("./userActionController")




/*******************************************************************************************************************************************
************************************************** User Controllers from userController.js *************************************************
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
************************************** blood bank Details Controllers from bloodBankController.js ********************************************
********************************************************************************************************************************************/


exports.createBankDetails = bloodBankController.bloodBankDetails;
exports.bloodBankInventory = bloodBankController.bloodBankInventory;
exports.bloodBankPriceInventory = bloodBankController.priceBloodInventory;
exports.bloodInventoryUpdate = bloodBankController.bloodBankInventoryUpdate;
exports.bloodInventoryIncrement = bloodBankController.bloodInventoryIncrement;
exports.bloodInventoryDecrement = bloodBankController.bloodInventoryDecrement;






/*******************************************************************************************************************************************
************************************** Users Action Controllers from userActionController.js  ********************************************
********************************************************************************************************************************************/


exports.userActionRequest = userAction.userRequestAction;
exports.userActionList = userAction.userRequestList;
exports.userRequestAcception = userAction.userRequestAcception;
exports.userRequestCancelation = userAction.userCancelRequest;
exports.pendingPayments = userAction.userPaymentDetails;






