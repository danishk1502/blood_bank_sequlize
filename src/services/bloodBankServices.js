const userModel = require('../models/models');
const blood_bank_detail = userModel.bloodBankDetails;






/*******************************************************************
 * findId
 * @param {*} username 
 * @returns : return data if id exist or not
 * @description : This function check about id in database
 * (This function also used in login)
*******************************************************************/

const bloodDetailById = async (uniqueID) => {
    try {
        const users = await  blood_bank_detail.findOne({
            where: {
                userId: uniqueID
            }
        })
        return users;
    } catch (e) {
        throw e ;
    }
};



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



module.exports = {addBloodBankDetails, bloodDetailById}