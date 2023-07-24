const { Model } = require('sequelize');
const userModel = require('../models/models');




const userRequestAction = async(requetData)=>{
    try {
        const actionDetails = await userModel.userActions.create(
            requetData
        )
        return actionDetails;
    } catch (e) {
        console.log("error occur"+ e);
    }
}

module.exports={userRequestAction}