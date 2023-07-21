const relationFunctions = require('./modelRelations')
const sequelizeDb = require('../config/dbConfig')
const userModel = require('./userModels');
const bloodBankDetails = require('./bloodBankDetails');
const bloodBankInventory = require('./bloodInventory');



const bankDetailRelation = relationFunctions.bloodBankDetailRelation(bloodBankDetails, userModel);


const bloodInventory = relationFunctions.bloodBankInventoryRelation(bloodBankInventory, userModel);





exports.userModel = userModel;
exports.bloodBankDetails = bloodBankDetails;
exports.bloodBankInventory = bloodBankInventory;




sequelizeDb.sync().then(() => {
    console.log('table created successfully');
}).catch((error) => {
    console.error('Unable to create table blood_bank_details: ', error);
});