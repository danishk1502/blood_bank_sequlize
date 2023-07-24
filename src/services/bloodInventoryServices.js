const { Model } = require('sequelize');
const userModel = require('../models/models');




const bloodInventorySearch = async(bankId)=>{
    try {
        const bloodBankDetails = await userModel.bloodBankInventory.findOne(
            {
                where:{
                    usersBloodBankId : bankId
                }
            }
        )
        return bloodBankDetails;
    } catch (e) {
        console.log("error occur"+ e);
    }
}


const bloodInventoryCreation2 = ()=>{
   
}



module.exports={bloodInventorySearch, bloodInventoryCreation2}