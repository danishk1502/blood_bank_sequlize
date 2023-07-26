const userModel = require('../models/models');


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