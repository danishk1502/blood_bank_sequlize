const userModel = require('../models/index');
const bloodBankDetail = userModel.bloodBankDetail;






/*******************************************************************
 * findId
 * @param {*} id 
*******************************************************************/

const bloodDetailById = async (uniqueID) => {
    try {
        const users = await  bloodBankDetail.findOne({
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
 * find by username
 * @param {*} username
*******************************************************************/

const bloodDetailByUsername = async (username) => {
    try {
        const users = await  bloodBankDetail.findOne({
            where: {
                username : username
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
        const bloodBankDetails = await bloodBankDetail.create(
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




/*******************************************************************
 * Users request Acception 
 * @param {*} id 
*******************************************************************/


const usersRequestAcception = async (uniqueID, data) => {
    try {
        const users = await  userModel.userActions.update(
            data,
            {
            where: {
                id : uniqueID
            }
        })
        return users;
    } catch (e) {
        throw e ;
    }
};









/*******************************************************************
 * findId for 
 * inventory
 * @param {*} id 
*******************************************************************/

const bloodPriceInventoryById = async (uniqueID) => {
    try {
        const users = await  userModel.priceBloodInventory.findOne({
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
 * creating blood price Inventory
 * @param {*} Inventory Data
*******************************************************************/

const bloodPriceInventoryCreation = async(inventoryData)=>{
    try {
        const bloodBankDetails = await userModel.priceBloodInventory.create(
            inventoryData
        )
        return bloodBankDetails;
    } catch (e) {
        console.log("error occur"+ e);
    }

}


module.exports = {addBloodBankDetails, bloodDetailById, bloodInventoryCreation, bloodDetailByUsername, bloodInventoryById, bloodPriceInventoryById, bloodPriceInventoryCreation, usersRequestAcception}