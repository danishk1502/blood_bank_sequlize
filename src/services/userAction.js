// const { Model } = require('sequelize');
const userModel = require('../models/index');



const requestFind  = async (attribute) => {
    try {
        const userRequest = await userModel.userAction.findOne({
            where: attribute
        })
        return userRequest;
    } catch (e) {
        console.log("error occur" + e);
    }
}






/*****************************************************
* User Request *
* @description * Services for user Request and Donation
* ****************************************************/

const userRequestAction = async (requestData) => {
    try {
        const actionDetails = await userModel.userAction.create(
            requestData
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
        const actionList = await userModel.userAction.findAll({
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
* User Donation rquest list*
* @description * Services for user Request list 
* ****************************************************/
const userDonationData = async (bankId) => {
    try {
        const actionList = await userModel.userAction.findAll({
            where: {
                usersBloodBankId: bankId,
                action: "Donation",
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
        const userRequest = await userModel.userAction.findOne({
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
        const userRequest = await userModel.userAction.findOne({
            where: {
                id: requestId,
                UserId:userId
            }
        })
        return userRequest;
    } catch (e) {
        console.log("error occur" + e);
    }
}





const userRequestUser = async (userId) => {
    try {
        const userRequest = await userModel.userAction.findAll({
            where: {
                UserId:userId
            }
        })
        return userRequest;
    } catch (e) {
        console.log("error occur" + e);
    }
}



/*****************************************************
* User Request list*
* @description * Services for user Request list 
* ****************************************************/
const userRequestsForBlood = async (myId) => {
    try {
        const actionList = await userModel.userAction.findAll({
            where: {
                UserId: myId,
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
* User Request list*
* @description * Services for user Request Accepted list 
* ****************************************************/

const userRequestsAccepted = async (myId) => {
    try {
        const actionList = await userModel.userAction.findAll({
            where: {
                UserId: myId,
                action: "Request",
                status: "Accepted"
            }
        })
        return actionList;
    } catch (e) {
        console.log("error occur" + e);
    }
}




module.exports = {userRequestAction, requestFind, userRequestData, userRequestFind, userRequestFindByUser, userDonationData, userRequestUser, userRequestsForBlood, userRequestsAccepted}

