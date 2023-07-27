const actionController =  require('../controllers/controller')








/**************************************************************************************************************
**********************************************************user Request Routes*************************************
***************************************************************************************************************/ 

/**********************************************************************************
* route-Controller*
* @description * route-Controller for users request for blood
* **********************************************************************************/

exports.usersActionRequest = actionController.userActionRequest;
exports.usersActionList = actionController.userActionList;
exports.userRequestAcception = actionController.userRequestAcception;
exports.userPaymentPending = actionController.pendingPayments;
exports.userCancelRequest = actionController.userRequestCancelation;
exports.userPaymentRoute = actionController.paymentController;








/**************************************************************************************************************
**********************************************************Donors  Routes*************************************
***************************************************************************************************************/ 


/**********************************************************************************
* route-Controller*
* @description * route-Controller for users donor for blood
* **********************************************************************************/