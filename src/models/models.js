const relationFunctions = require('./modelRelations')
const sequelizeDb = require('../config/dbConfig')
const userModel = require('./userModels');
const bloodBankDetails = require('./bloodBankDetails');
const bloodBankInventory = require('./bloodInventory');
const userActions = require('./userAction');
const priceInventory = require('./priceBloodInventory');



const bankDetailRelation = relationFunctions.bloodBankDetailRelation(bloodBankDetails, userModel);
const bloodInventory = relationFunctions.bloodBankInventoryRelation(bloodBankInventory, userModel);
const userActionRelation = relationFunctions.userActionRelation(userActions, userModel);
const priceBloodInventory = relationFunctions.priceBloodInventoryRelation(priceInventory, userModel);



exports.userModel = userModel;
exports.bloodBankDetails = bloodBankDetails;
exports.bloodBankInventory = bloodBankInventory;
exports.userActions = userActions;
exports.priceBloodInventory = priceInventory;



sequelizeDb.sync().then(() => {
    console.log('table created successfully');
}).catch((error) => {
    console.error('Unable to create table blood_bank_details: ', error);
});