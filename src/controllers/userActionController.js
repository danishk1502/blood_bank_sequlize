const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const RESPONSE = require("../utils/responsesutil/responseutils");
const STATUS_CODE = require("../utils/responsesutil/statusCodeUtils");
const bloodInventory = require("../services/bloodInventoryServices")
const userActionServices = require("../services/userAction")
const userPayments = require("../services/paymentServices");



/*****************************************************************************************************************************************************************
*******************************************************************User Action for Blood Request******************************************************************
\****************************************************************************************************************************************************************/


/********************************************************
* Controller*
* @description * creating users blood request controller
* ******************************************************/

exports.userRequestAction = async (req, res) => {
    try {
        const username = req.body.blood_bank_username;
        const bloodBankDetails = await service.findUsername(username);
        if (bloodBankDetails == null) {
            return res.json({
                msg: RESPONSE.USERNAME_NOT_VALID
            })
        }
        const bloodInventoryFind = await bloodInventory.bloodInventorySearch(bloodBankDetails.id);
        if (typeof bloodInventoryFind == "string") {
            return res.json({
                msg: RESPONSE.EXCEPTION_ERROR
            })
        }
        if (bloodInventoryFind == null) {
            return res.json({
                msg: RESPONSE.BLOOD_NOT_AVAILABLE
            })
        }
        if (bloodBankDetails.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.INVALID_BANK
            })
        }
        const totalBloodUnits = { units: bloodInventoryFind[req.body.blood_group] }
        if (totalBloodUnits.units <= 0) {
            return res.json({
                msg: RESPONSE.BLOOD_NOT_AVAILABLE
            })
        }
        if (req.body.number_of_blood_unit <= 0) {
            return res.json({
                msg: RESPONSE.VALID_NUMBER_OF_BLOOD_UNIT
            })

        }
        if (req.body.number_of_blood_unit > 3) {
            return res.json({
                msg: RESPONSE.REQUEST_LIMIT_EXCEDED_FOR_BLOOD
            })
        }
        if (totalBloodUnits.units < req.body.number_of_blood_unit) {
            return res.json({
                msg: RESPONSE.BLOOD_LESS_THAN_REQUIREMENT
            })
        }
        req.body.UserId = req.data.id;
        req.body.usersBloodBankId = bloodBankDetails.id;
        req.body.action = "request";
        req.body.created_by = req.data.username;
        req.body.updated_by = req.data.username;
        const usersAction = await userActionServices.userRequestAction(req.body);
        if (usersAction != null) {
            const paymentData = { userActionId: usersAction.id, UserId: req.data.id };
            const payDetails = await userPayments.createPaymentData(paymentData);
            return res.json({ data: payDetails });
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/*********************************************************************************
* Controller *
* @description * list of users blood request 
* ********************************************************************************/

exports.userRequestList = async (req, res) => {
    try {
        const userInfo = await service.findId(req.data.id);
        if (userInfo.role != "blood_bank") { res.json({ msg: RESPONSE.PERMISSSION_DENIED }) }
        const findRequest = await userActionServices.userRequestData(req.data.id);
        const requestCheck = findRequest == null ? res.json({ msg: RESPONSE.DATA_NOT_FOUND }) : res.json({ data: findRequest });
        return requestCheck
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}




/*********************************************************************************
* Controller *
* @description * list of users blood donation 
* ********************************************************************************/


exports.userDonationList = async (req, res) => {
    try {
        const userInfo = await service.findId(req.data.id);
        if (userInfo.role != "blood_bank") { res.json({ msg: RESPONSE.PERMISSSION_DENIED }) }
        const findRequest = await userActionServices.userDonationData(req.data.id);
        const requestCheck = findRequest == null ? res.json({ msg: RESPONSE.DATA_NOT_FOUND }) : res.json({ data: findRequest });
        return requestCheck
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}





/*********************************************************************************
* Controller*
* @description * creating users blood request Acception by blood Bank controller
* ********************************************************************************/

exports.userRequestAcception = async (req, res) => {
    try {
        const bankId = req.data.id;
        const findRequest = await userActionServices.userRequestFind(req.body.requestId, bankId);
        if (req.body.status != "Accept") {
            if (findRequest.status != null) {
                if (findRequest.rejected_by == null) {
                    return res.json({ msg: RESPONSE.PREACCEPTED_REQUEST })
                }
                else if (findRequest.rejected_by == "user") {
                    return res.json({ msg: RESPONSE.USER_CANCEL_REQUEST })
                }
                else {
                    return res.json({ msg: RESPONSE.USER_CANCEL_REQUEST })
                }
            }
            if (findRequest == null) {
                return res.json({ msg: RESPONSE.ALREADY_REJECTED_BY_BLOOD_BANK });
            }
            const dataUpdate = { status: "Reject", rejected_by: "blood_bank" }
            const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, dataUpdate);
            const paymentUpdate = await userPayments.updatePaymentData({ payment: "Incomplete" }, findRequest.id);
            return res.json({ msg: RESPONSE.REJECTED_REQUEST });
        }
        if (findRequest == null) {
            return res.json({ msg: RESPONSE.DATA_NOT_FOUND });
        }
        if (findRequest.status != null) { return res.json({ msg: RESPONSE.REQUEST_NOT_FOUND }); }
        if (findRequest.action != "Request") { return res.json({ msg: RESPONSE.NOT_VALID_REQUEST }); }
        const priceDetails = await bloodBankService.bloodPriceInventoryById(bankId);
        if (priceDetails == null) {
            return res.json({
                msg: RESPONSE.PRICE_INVENTORY
            });
        }
        const findInventory = await bloodInventory.bloodInventorySearch(bankId);
        const blood_units = findInventory[findRequest.blood_group] - findRequest.number_of_blood_unit;
        const inventoryUpdate = await bloodInventory.bloodInventoryChange(bankId, { [findRequest.blood_group]: blood_units })
        const paymentData = {
            total_amount: priceDetails[findRequest.blood_group] * findRequest.number_of_blood_unit,
            payment: "Pending",
        }
        const paymentDataUpdate = await userPayments.updatePaymentData(paymentData, findRequest.id);

        const dataUpdate = { status: "Accepted" }
        const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, dataUpdate);
        const blood_group = findRequest.blood_group;
        return res.json({ msg: RESPONSE.CREATED_SUCCESS });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}




/********************************************************************************
 * User Request Cancel for blood Donation 
*********************************************************************************/

exports.userCancelRequest = async (req, res) => {
    try {
        const userId = req.data.id;
        const findRequest = await userActionServices.userRequestFindByUser(req.body.requestId, userId);
        if (findRequest.status == null) {
            const data = { status: "Reject", rejected_by: "user" };
            const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, data);
            const paymentUpdate = await userPayments.updatePaymentData({ payment: "Incomplete" }, findRequest.id);
            return res.json({
                msg: "Request is rejected",
                data: requestAcception
            })
        }
        else if (findRequest.status == "Accepted") {
            const checkPayment = await userPayments.findPaymentOneData(findRequest.id);
            if (checkPayment.payment == "Complete") {
                return res.json(
                    {
                        msg: RESPONSE.REJECTION_AFTER_PAYMENT
                    }
                );
            }
            const findInventory = await bloodInventory.bloodInventorySearch(findRequest.usersBloodBankId);
            const blood_units = findInventory[findRequest.blood_group] + findRequest.number_of_blood_unit;
            const inventoryUpdate = await bloodInventory.bloodInventoryChange(findRequest.usersBloodBankId, { [findRequest.blood_group]: blood_units })
            const data = { status: "Reject", rejected_by: "user" };
            const requestAcception = await bloodBankService.usersRequestAcception(findRequest.id, data);
            const paymentUpdate = await userPayments.updatePaymentData({ payment: "Incomplete" }, findRequest.id);
            return res.json({ msg: RESPONSE.REQUEST_REJECTED, data: requestAcception });
        }
        else if (findRequest.status == "Reject" && findRequest.rejected_by == "blood_bank") {
            return res.json({
                msg: RESPONSE.ALREADY_REJECTED_BY_BLOOD_BANK
            });
        }
        else {
            return res.json({ msg: "fghjk" });
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}

/*********************************************************************************
* Controller*
* @description * creating users payment Details show
* ********************************************************************************/

exports.userPaymentDetails = async (req, res) => {
    try {
        const pendingPaymentData = await userPayments.findPaymentData(req.data.id);
        const pendingCondition = pendingPaymentData == null ? res.json({ msg: RESPONSE.DATA_NOT_FOUND }) : res.json({ data: pendingPaymentData, msg: RESPONSE.DATA_GET })
        return pendingCondition;
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}




/*********************************************************************************
* Controller*
* @description * creating users payment complete by user
* ********************************************************************************/

exports.userPaymentCompleteion = async (req, res) => {
    try {
        const { requestId, transaction_id } = req.body;
        const paymentFind = await userPayments.findPaymentOneData(requestId);
        if (paymentFind.payment != "Pending") { return res.send("Request is rejected or may be amount paid.....") }
        if (req.body.paid_amount !== paymentFind.total_amount) { return res.send("Please Pay complete amount"); }
        const data = {
            payment: "Complete",
            transaction_id: transaction_id,
            updated_by: req.data.username
        }
        const [dataUpdation, findUser, findRequest, findBloodBank] = await Promise.all([
            userPayments.updatePaymentData(data, requestId),
            service.findId(req.data.id),
            userActionServices.userRequestFindByUser(requestId, req.data.id),
            service.findId(findRequest.usersBloodBankId)
        ])
        const receipt = {
            name: findUser.name,
            blood_bank: findBloodBank.name,
            transactionId: req.body.transaction_id,
            total_amount_paid: req.body.paid_amount
        }
        return res.json({ payment_receipt: receipt })
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/*****************************************************************************************************************************************************************
*******************************************************************User Action for Blood Donation******************************************************************
\****************************************************************************************************************************************************************/


/********************************************************
* Controller*
* @description * creating users donation controller
* ******************************************************/

exports.donationRequest = async (req, res) => {
    try {
        const userId = req.data.id;
        const findUser = await service.findId(userId);
        const date1 = new Date();
        const date = date1.getDate();
        const month = date1.getMonth() + 1;
        const year = date1.getFullYear();
        const presentDate = date - month - year;
        const bloodBankDetails = await service.findUsername(req.body.blood_bank_username);
        if (bloodBankDetails.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.WRONG_BLOOD_BANK
            });
        }
        if (findUser.able_to_donate == null || findUser.able_to_donate < presentDate) {
            const data = {
                action: "Donation",
                blood_group: req.body.blood_group,
                UserId: req.data.id,
                usersBloodBankId: bloodBankDetails.id,
                created_by: req.data.username,
                updated_by: req.data.username
            }
            const usersAction = await userActionServices.userRequestAction(data);
            return res.send(usersAction);
        }
        else {
            return res.json({
                msg: RESPONSE.NOT_ABLE_TO_DONATE
            })
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}




/****************************************************************************************************************
 * users donation Request Handling
 * Creating users donation request acception controller
********************************************************************************************************************/

exports.donationAcception = async (req, res) => {
    try {
        const bankId = req.data.id;
        const findRequest = await userActionServices.userRequestFind(req.body.requestId, bankId);
        if (req.body.requestId != findRequest.id) {
            return res.json({
                msg: RESPONSE.NOT_VALID_REQUEST
            })
        }
        if (findRequest.status == null) {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const acceptionDate = year + "-" + month + "-" + day;
            if (acceptionDate >= req.body.date_schedule) {
                return res.json({ msg: RESPONSE.DATE_SCHEDULE })
            }
            if (req.body.request == "Accepted") {
                const data = {
                    status: "Accepted",
                    date: req.body.date_schedule
                }
                const donationAcception = await bloodBankService.usersRequestAcception(req.body.requestId, data)
                return res.json({ data: donationAcception });
            }
            const data = {
                status: "Reject",
                rejected_by: "blood_bank",
                date: new Date()
            }
            const donationAcception = await bloodBankService.usersRequestAcception(req.body.requestId, data)
            return res.json({ data: donationAcception });

        } else {
            const rejectionCheck = findRequest.rejected_by == "user" ? res.json({ msg: RESPONSE.USER_REJECTED_REQUEST }) : res.json({ msg: RESPONSE.REJECTED_BY_BLOOD_BANK })
            return rejectionCheck;
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}


/************************************************************************************************************************
*************************************** Donation Confirmation************************************************************
***************************** Donation Confirmation on Donation Completion***********************************************
*************************************************************************************************************************/

exports.donationConfirmation = async (req, res) => {
    try {
        const requestId = req.body.requestId;
        const bankId = req.data.id;
        const findRequest = await userActionServices.userRequestFind(requestId, bankId);
        if (findRequest.action != "Donation") { return res.json({ msg: RESPONSE.NOT_VALID_REQUEST }); }
        if (findRequest.status != "Accepted") { return res.json({ msg: RESPONSE.NOT_VALID_REQUEST }); }
        if (findRequest.donation != null) { return res.json({ msg: RESPONSE.REQUEST_NOT_FOUND }); }
        const donationData = {
            donation: "Done",
        }
        const bloodInventoryFind = await bloodBankService.bloodInventoryById(bankId);
        const updateValues = bloodInventoryFind[findRequest.blood_group] + 1;
        const inventoryUpdate = await bloodInventory.bloodInventoryChange(req.data.id, { [findRequest.blood_group]: updateValues });
        const donationAcception = await bloodBankService.usersRequestAcception(findRequest.id, donationData);
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month + 3 > 12) {
            let updateMonth = (month + 3) - 12;
            year = year + 1;
        }
        else {
            updateMonth = month + 3;
        }
        const updateDate = year + "-" + updateMonth + "-" + day;
        const updateData = {
            last_donation: year + "-" + month + "-" + day,
            able_to_donate: updateDate
        }
        console.log(updateData);
        const updateUser = await service.userUpdation(updateData, findRequest.UserId);
        return res.json({ msg: RESPONSE.DONATION_COMPLETE });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/************************************************************************************************************************
*************************************** Donation Rejection By User*******************************************************
***************************** Donation Confirmation on Donation Completion***********************************************
*************************************************************************************************************************/

exports.donationCancel = async (req, res) => {
    try {
        const userId = req.data.id;
        const { requestId } = req.body;
        const requestData = await userActionServices.userRequestFindByUser(requestId, userId);
        if (requestData.donation == "Done") { return res.json({ msg: RESPONSE.PERMISSSION_DENIED }); }
        if (requestData.rejected_by != null) { return res.json({ msg: RESPONSE.REQUEST_REJECTED }) }
        const data = {
            rejected_by: "user",
            donation: "Incomplete"
        }
        const donationAcception = await bloodBankService.usersRequestAcception(requestId, data);
        res.json({ msg: RESPONSE.REQUEST_REJECTED });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}


