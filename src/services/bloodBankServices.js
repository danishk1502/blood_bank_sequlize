const userModel = require('../models/models');
const blood_bank_detail = userModel.bloodBankDetails;






/*******************************************************************
 * findId
 * @param {*} id 
*******************************************************************/

const bloodDetailById = async (uniqueID) => {
    try {
        const users = await  blood_bank_detail.findOne({
            where: {
                usersBloodBankId : uniqueID
            }
        })
        return users;
    } catch (e) {
        throw e ;
    }
};

/*******************************************************************
 * Adding Details on blood bank details table
 * @param {*} bloodbankDetails 
*******************************************************************/

const addBloodBankDetails = async(data)=>{
    try {
        const bloodBankDetails = await blood_bank_detail.create(
            data
        )
        return bloodBankDetails;
    } catch (e) {
        console.log("error occur"+ e);
    }

}


/*******************************************************************
 * creating blood Inventory
 * @param {*} Inventory Data
*******************************************************************/

const bloodInventoryCreation = async(inventoryData)=>{
    try {
        const bloodBankDetails = await userModel.bloodBankInventory.create(
            inventoryData
        )
        return bloodBankDetails;
    } catch (e) {
        console.log("error occur"+ e);
    }

}


/*******************************************************************
 * findId for 
 * inventory
 * @param {*} id 
*******************************************************************/

const bloodInventoryById = async (uniqueID) => {
    try {
        const users = await  userModel.bloodBankInventory.findOne({
            where: {
                usersBloodBankId : uniqueID
            }
        })
        return users;
    } catch (e) {
        throw e ;
    }
};


module.exports = {addBloodBankDetails, bloodDetailById, bloodInventoryCreation, bloodInventoryById}