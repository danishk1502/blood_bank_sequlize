const userModel = require("../models/index");

/*****************************************
payment Data Creation
********************************************/

const createPaymentData = async (data) => {
  try {
    const paymentDetails = await userModel.userPayments.create(data);
    return paymentDetails;
  } catch (e) {
    console.log("error occur  " + e);
  }
};

/***************************************************
update payment Data Creation (while request accept)
****************************************************/

const updatePaymentData = async (data, requestId) => {
  try {
    const paymentDetailsUpdate = await userModel.userPayments.update(data, {
      where: {
        userActionId: requestId,
      },
    });
    return paymentDetailsUpdate;
  } catch (e) {
    console.log("error occur" + e);
  }
};

/**********************************************
 * @param {*} attribute
 * @returns showing data about payment to user
 ***********************************************/

const findPayment = async (attribute) => {
  try {
    const paymentDetails = await userModel.userPayments.findAll({
      where: attribute,
    });
    return paymentDetails;
  } catch (e) {
    console.log("error occur" + e);
  }
};

module.exports = { findPayment, updatePaymentData, createPaymentData };
