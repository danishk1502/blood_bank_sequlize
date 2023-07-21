const relationFunctions = require('./modelRelations')
const sequelizeDb = require('../config/dbConfig')
const userModel = require('./userModels');
const bloodBankDetails = require('./blood_bank_detail');



const bankDetailRelation = relationFunctions.bloodBankDetailRelation(bloodBankDetails, userModel);




exports.userModel = userModel;
exports.bloodBankDetails = bloodBankDetails;

sequelizeDb.sync().then(() => {
    console.log('table created successfully');
}).catch((error) => {
    console.error('Unable to create table blood_bank_details: ', error);
});