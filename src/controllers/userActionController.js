const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const RESPONSE = require("../utils/responseUtils");
const bloodInventory = require("../services/bloodInventoryServices")
const userActionServices = require("../services/userAction")
const userPayments = require("../services/paymentServices")



/********************************************************
* Controller*
* @description * creating users blood request controller
* ******************************************************/

exports.userRequestAction = async (req, res) => {
    const username = req.body.blood_bank_username;
    const bloodBankDetails = await service.findUsername(username);
    const findUserData = await service.findId(req.data.id);
    const bloodInventoryFind = await bloodInventory.bloodInventorySearch(bloodBankDetails.id);
    console.log(bloodInventoryFind)

    if (bloodInventoryFind == null) {
        res.send("blood is not available inn this blood bank");
    }
    else {
        if (findUserData.role == "user") {
            if (bloodBankDetails.role == "blood_bank") {
                const bloodBankInventory = await bloodInventory.bloodInventorySearch(bloodBankDetails.id);
                const totalBloodUnits = { units: bloodBankInventory[req.body.blood_group] }
                if (totalBloodUnits.units > 0) {
                    if (req.body.number_of_blood_unit <= 0) {
                        res.send("Enter valid number of blood unit");
                    }
                    else {
                        if (req.body.number_of_blood_unit > 3) {
                            res.send("you only make request for less than 4 units");
                        } else {
                            if (totalBloodUnits.units < req.body.number_of_blood_unit) {
                                res.send("blood is available but requirement not satisfied");
                            } else {
                                req.body.userId = req.data.id;
                                req.body.usersBloodBankId = bloodBankDetails.id;
                                req.body.action = "request";
                                req.body.created_by = req.data.username;
                                req.body.updated_by = req.data.username;
                                const usersAction = await userActionServices.userRequestAction(req.body);
                                if (usersAction != null) {
                                    const paymentData = { userActionId: usersAction.id, userId: req.data.id };
                                    const payDetails = await userPayments.createPaymentData(paymentData);
                                    res.json({ data: paymentData });
                                }

                            }
                        }
                    }
                }
                else {
                    res.send("Sorry Blood unit are not available");
                }
            }
            else {
                res.send("sorry choose correct bank");
            }
        }
        else {
            res.send("you dont have access to request");
        }
    }
}



/*********************************************************************************
* Controller *
* @description * list of users blood request 
* ********************************************************************************/

exports.userRequestList = async (req, res) => {
    const bankId = req.data.id;
    const findRequest = await userActionServices.userRequestData(bankId);
    if (findRequest == null) {
        res.send("No data Available here")
    }
    else {
        res.send(findRequest);
    }
}




/*********************************************************************************
* Controller*
* @description * creating users blood request Acception by blood Bank controller
* ********************************************************************************/

exports.userRequestAcception = async (req, res) => {
    const bankId = req.data.id;
    const findRequest = await userActionServices.userRequestFind(req.body.requestId, bankId);
    if (req.body.status == "Accept") {
        if (findRequest == null) {
            res.send("no request here may be cancel by user");
        }
        else {
            if (findRequest.status == null) {
                if (findRequest.action == "Request") {
                    const priceDetails = await bloodBankService.bloodPriceInventoryById(bankId);
                    if (priceDetails == null) {
                        res.send("First Create Price Inventory");
                    }
                    else {
                        const findInventory = await bloodInventory.bloodInventorySearch(bankId);
                        const blood_units = findInventory[findRequest.blood_group] - findRequest.number_of_blood_unit;
                        const inventoryUpdate = await bloodInventory.bloodInventoryChange(bankId, { [findRequest.blood_group]: blood_units })
                        const paymentData = {
                            total_amount: priceDetails[findRequest.blood_group] * findRequest.number_of_blood_unit,
                            payment: "Pending",
                        }
                        const paymentDataUpdate = await userPayments.updatePaymentData(paymentData, findRequest.id);
                        res.json(inventoryUpdate);
                    }
                }
                else {
                    res.json({ msg: RESPONSE.NOT_VALID_REQUEST });
                }
                const dataUpdate = { status: "Accepted" }
                const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, dataUpdate);
                const blood_group = findRequest.blood_group;
            }
            else {
                res.send("Request may be rejected by user or accepted by bank");
            }
        }
    }
    else {
        if (findRequest.status == null) {
            if (findRequest == null) {
                res.json({ msg: RESPONSE.NOT_VALID_REQUEST });
            }
            else {
                const dataUpdate = { status: "Reject", rejected_by: "blood_bank" }
                const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, dataUpdate);
                res.json({ msg: "Request Rejected Successfully" });
            }
        }
        else {
            if (findRequest.rejected_by == null) {
                res.send("Request already Accepted");
            }
            else if (findRequest.rejected_by == "user") {
                res.send("Request may be rejected by user");
            }
            else {
                res.send("Bloodbank already reject the request");
            }

        }
    }
}




/********************************************************************************
 * User Request Cancel for blood Donation 
 ********************************************************************************/

exports.userCancelRequest = async (req, res) => {
    const userId = req.data.id;
    const findRequest = await userActionServices.userRequestFindByUser(req.body.requestId, userId);
    // res.send(findRequest);
    if (findRequest.status == null) {
        const data = { status: "Reject", rejected_by: "user" };
        const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, data);
        res.json({
            msg: "Request is rejected",
            data: requestAcception
        })
    }
    else if (findRequest.status == "Accepted") {
        const checkPayment = await userPayments.findPaymentOneData(findRequest.id);
        // res.send(checkPayment);
        if (checkPayment.payment != "Complete") {
            const findInventory = await bloodInventory.bloodInventorySearch(findRequest.usersBloodBankId);
            const blood_units = findInventory[findRequest.blood_group] + findRequest.number_of_blood_unit;
            const inventoryUpdate = await bloodInventory.bloodInventoryChange(findRequest.usersBloodBankId, { [findRequest.blood_group]: blood_units })
            const data = { status: "Reject", rejected_by: "user" };
            const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, data);
            const paymentUpdate = await userPayments.updatePaymentData({payment:"Incomplete"}, findRequest.id);
            res.json({ msg: "Request Rejected successfully", data: requestAcception});
        }
        else{
            res.json(
                {
                    msg : "your payment already completed you need too contact with blood bank"
                }
            )
        }

    }
    else if (findRequest.status == "Reject" && findRequest.rejected_by == "blood_bank") {
        res.send("your request already rejected by blood bank");

    }
    else {
        res.send("your blood banks request already rejected");
    }

}






/*********************************************************************************
* Controller*
* @description * creating users payment Details show
* ********************************************************************************/

exports.userPaymentDetails = async (req, res) => {
    const pendingPaymentData = await userPayments.findPaymentData(req.data.id);
    res.json({
        data: pendingPaymentData,
        msg: RESPONSE.DATA_GET
    });
}






/*********************************************************************************
* Controller*
* @description * creating users payment complete by user
* ********************************************************************************/

exports.userPaymentCompleteion = async (req, res) => {

}