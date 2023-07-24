const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const responseJson = require("../utils/responseUtils");
const bloodInventory = require("../services/bloodInventoryServices")
const userActionServices = require("../services/userAction")




exports.userRequestAction = async (req, res) => {
    const username = req.body.blood_bank_username;
    const bloodBankDetails = await service.findUsername(username);
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
        res.send("sorry choose correct bank")
    }
}