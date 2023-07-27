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
                                const paymentData = { userActionId: usersAction.id, userId: req.data.id };
                                const paymentDetails = await userPayments.createPaymentData(paymentData);
                                res.json(usersAction);
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
    if (findRequest == null) {
        res.send("no request here may be cancel by user");
    }
    else {
        const dataUpdate = { status: "Accepted" }
        const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, dataUpdate);
        const blood_group = findRequest.blood_group;
        const findInventory = await bloodInventory.bloodInventorySearch(bankId);

        //payment table update here 

        if (findRequest.action == "Request") {
            const priceDetails = await bloodBankService.bloodPriceInventoryById(bankId);
            if (priceDetails == null) {
                res.send("First Create Price Inventory");
            }
            else {
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

    }
}




/*********************************************************************************
* Controller*
* @description * creating users payment Details show
* ********************************************************************************/

exports.userPaymentDetails = async (req, res) => {
    const pendingPaymentData =  await userPayments.findPaymentData(req.data.id);
    res.json({
        data:pendingPaymentData,
        msg : RESPONSE.DATA_GET
    });

}

/*********************************************************************************
* Controller*
* @description * creating users payment complete by user
* ********************************************************************************/

exports.userPaymentCompleteion = async (req, res) => {

}