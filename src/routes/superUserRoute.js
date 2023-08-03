const superuserController = require('../controllers/controller') 




/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for get all data of pending blood banks
* **********************************************************************************/
exports.pendingRequest = superuserController.pendingRequest;


/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for decline registration request for a blood bank
* **********************************************************************************/
exports.requestDecline = superuserController.requestDecline;


/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for acception registration request for a blood bank
* **********************************************************************************/
exports.requestAcception = superuserController.requestAcception;


exports.superUserRegister = superuserController.superUserRegister;