const actionController =  require('../controllers/controller')



exports.usersActionRequest = actionController.userActionRequest;


exports.usersActionList = actionController.userActionList;

exports.userRequestAcception = actionController.userRequestAcception;

// payment routes 

exports.userPaymentPending = actionController.pendingPayments;