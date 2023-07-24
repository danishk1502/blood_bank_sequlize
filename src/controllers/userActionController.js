const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const responseJson = require("../utils/responseUtils");
const bloodInventory = require("../services/bloodInventoryServices")
const userActionServices = require("../services/userAction")



/********************************************************
* Controller*
* @description * creating users blood request controller
* ******************************************************/

exports.userRequestAction = async (req, res) => {
    const username = req.body.blood_bank_username;
    const bloodBankDetails = await service.findUsername(username);
    const findUserData = await service.findId(req.data.id);
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

exports.userRequestAcception = async(req, res) => {
    const bankId = req.data.id;
    const findRequest = await userActionServices.userRequestFind(req.body.requestId, bankId);
    if(findRequest == null){
        res.send("no request here may be cancel by user");
    }
    else{
        const dataUpdate = {status : "Accepted"}
        const requestAcception = bloodBankService.usersRequestAcception(findRequest.id, dataUpdate);
        res.json(requestAcception);
        console.log(findRequest.blood_group);
    }
}