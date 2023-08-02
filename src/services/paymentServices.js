const userModel = require('../models/index');



/*****************************************
payment Data Creation
********************************************/

exports.createPaymentData = async(data)=>{
    try {
        const paymentDetails = await userModel.userPayments.create(
            data
        )
        return paymentDetails;
    } catch (e) {
        console.log("error occur" + e);
    }

}


/***************************************************
update payment Data Creation (while request accept)
****************************************************/

exports.updatePaymentData = async(data, requestId)=>{
    try {
        const paymentDetailsUpdate = await userModel.userPayments.update(
            data,
            {
                where:{
                    userActionId : requestId
                }
            }
        )
        return paymentDetailsUpdate;
    } catch (e) {
        console.log("error occur" + e);
    }

}


/**********************************************
 * @param {*} userId 
 * @returns showing data about payment to user
 ***********************************************/

exports.findPaymentData = async(userId)=>{
    try {
        const paymentDetails = await userModel.userPayments.findAll(
            {
                where:{
                    UserId : userId,
                    payment : "Pending"

                }
            }
        )
        return paymentDetails;
    } catch (e) {
        console.log("error occur" + e);
    }

}


/**********************************************
 * @param {*} by id 
 * @returns showing data about payment to user
 ***********************************************/

exports.findPaymentOneData = async(actionId)=>{
    try {
        const paymentDetails = await userModel.userPayments.findOne(
            {
                where:{
                    userActionId : actionId
                }
            }
        )
        return paymentDetails;
    } catch (e) {
        console.log("error occur" + e);
    }

}