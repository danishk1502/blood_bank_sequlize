// const { Model } = require('sequelize');
const userModel = require('../models/index');



/*****************************************************
* User Request Find*
* @description * Services for user Request find
* ****************************************************/

const requestFind  = async (attribute) => {
    try {
        const userRequest = await userModel.userAction.findAll({
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





module.exports = {userRequestAction, requestFind}

