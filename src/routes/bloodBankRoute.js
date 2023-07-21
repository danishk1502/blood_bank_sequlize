const bloodBankController = require("../controllers/controller")


/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for adding blood bank details
* **********************************************************************************/

exports.createDetailBloodBank = bloodBankController.createBankDetails;





/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for creating blood inventory
* **********************************************************************************/

exports.createBloodBankInventory = bloodBankController.bloodBankInventory;