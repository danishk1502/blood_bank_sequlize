const { Model } = require('sequelize');
const userModel = require('../models/models');


/*****************************************************
* User Request *
* @description * Services for user Request and Donation
* ****************************************************/

const userRequestAction = async (requetData) => {
    try {
        const actionDetails = await userModel.userActions.create(
            requetData
        )
        return actionDetails;
    } catch (e) {
        console.log("error occur" + e);
    }
}

/*****************************************************
* User Request list*
* @description * Services for user Request list 
* ****************************************************/
const userRequestData = async (bankId) => {
    try {
        const actionList = await userModel.userActions.findAll({
            where: {
                usersBloodBankId: bankId,
                action: "Request",
                status: null
            }
        })
        return actionList;
    } catch (e) {
        console.log("error occur" + e);
    }
}



/*****************************************************
* User Request find*
* @description * Services for user Request find by blood bank
* ****************************************************/
const userRequestFind = async (requestId, bankId) => {
    try {
        const userRequest = await userModel.userActions.findOne({
            where: {
                id: requestId,
                usersBloodBankId:bankId
            }
        })
        return userRequest;
    } catch (e) {
        console.log("error occur" + e);
    }
}



/*****************************************************
* User Request find*
* @description * Services for user Request find by user
* ******************************************* *********/
const userRequestFindByUser = async (requestId, userId) => {
    try {
        const userRequest = await userModel.userActions.findOne({
            where: {
                id: requestId,
                userId:userId
            }
        })
        return userRequest;
    } catch (e) {
        console.log("error occur" + e);
    }
}



module.exports = {userRequestAction, userRequestData, userRequestFind, userRequestFindByUser}