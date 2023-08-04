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


/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for creating blood bank price inventory
* **********************************************************************************/

exports.createBloodBankPriceInventory = bloodBankController.bloodBankPriceInventory;


/**********************************************************************************
* route-Controller*
* @description * route-Controller connection for updating blood bank blood inventory
* **********************************************************************************/

exports.updateBloodInventory = bloodBankController.bloodInventoryUpdate;
exports.incrementBloodInventory = bloodBankController.bloodInventoryIncrement;
exports.decrementBloodInventory = bloodBankController.bloodInventoryDecrement;


exports.bloodBankpriceInventoryUpdate = bloodBankController.bloodBankpriceInventoryUpdate;
