const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const bloodInventoryServices = require('../services/bloodInventoryServices')
const RESPONSE = require("../utils/responseUtils")





/********************************************
 * blood Bank Detail Controller
 * Creating blood banks details controller
*********************************************/

exports.bloodBankDetails = async (req, res) => {
    const authId = req.data.id;
    const checkId = await service.findId(authId);
    if (checkId.role == "blood_bank") {
        if (checkId.user_status == "Active") {
            req.body.usersBloodBankId = req.data.id;
            req.body.created_by = req.data.username;
            req.body.updated_by = req.data.username;

            const findUserData = await bloodBankService.bloodDetailById(checkId.id);
            if (findUserData == null) {
                const createDetails = await bloodBankService.addBloodBankDetails(req.body);
                res.json({
                    msg: RESPONSE.CREATED_SUCCESS,
                    data: createDetails
                });
            }
            else {
                res.send("you cant regenarate it but you can update it..")
            }
        }
        else {
            res.json({
                msg: RESPONSE.NOT_PERMISION_TO_LOGIN,
            });
        }
    }
    else {
        res.json({
            msg: RESPONSE.PERMISSSION_DENIED
        });
    }
}




/*********************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller
***********************************************/

exports.bloodBankInventory = async (req, res) => {
    const authId = req.data.id;
    const checkId = await service.findId(authId);
    if (checkId.role == "blood_bank") {
        if (checkId.user_status == "Active") {
            req.body.usersBloodBankId = req.data.id;
            req.body.created_by = req.data.username;
            req.body.updated_by = req.data.username;

            const findUserData = await bloodBankService.bloodInventoryById(checkId.id);
            if (findUserData == null) {
                let updatevalues = Object.values(req.body);
                const dataFilter = updatevalues.filter((value, index) => {
                    return value < 0;
                })
                if (dataFilter.length == 0) {
                    const createInventory = await bloodBankService.bloodInventoryCreation(req.body);

                    res.json({
                        msg: RESPONSE.CREATED_SUCCESS,
                        data: createInventory
                    });
                }
                else {
                    res.send("you entered negative values");
                }
            }
           
            else {
                res.send("you cant regenarate it but you can update it..")
            }
        }
        else {
            res.json({
                msg: RESPONSE.NOT_PERMISION_TO_LOGIN
            });
        }
    }
    else {
        res.json({
            msg: RESPONSE.PERMISSSION_DENIED
        });
    }
}




/***********************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to update Data 
************************************************************/

exports.bloodBankInventoryUpdate = async (req, res) => {
    const bankId = req.data.id;
    const verifyBank = await service.findId(bankId);
    if (verifyBank.role == "blood_bank") {
        const findInventory = await bloodBankService.bloodInventoryById(bankId);
        if (findInventory == null) {
            res.send("you need to create inventory first");
        }
        else {
            const updateData = await bloodInventoryServices.bloodInventoryChange(bankId, req.body)
            res.json({
                msg: RESPONSE.DATA_UPDATED,
                data: updateData
            });
        }
    }
    else {
        res.json({
            msg: RESPONSE.PERMISSSION_DENIED
        });
    }
}




/**************************************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to Increment Blood unit Data 
 * * @description : This function to add a number of blood unit 
*****************************************************************************/

exports.bloodInventoryIncrement = async (req, res) => {
    const bankId = req.data.id;
    const verifyBank = await service.findId(bankId);
    if (verifyBank.role == "blood_bank") {
        const bloodInventory = await bloodBankService.bloodInventoryById(bankId);
        if (bloodInventory != null) {
            let keysInventory = Object.keys(bloodInventory.dataValues);
            let updateKeys = Object.keys(req.body);
            let valuesInventory = Object.values(bloodInventory.dataValues);
            let updatevalues = Object.values(req.body);
            const dataFilter = updatevalues.filter((value, index) => {
                return value < 0;
            })
            if (dataFilter.length == 0) {
                const keysTotal = []
                const updateObject = {};
                for (let i = 0; i < keysInventory.length; i++) {
                    for (let j = 0; j < updateKeys.length; j++) {
                        if (keysInventory[i] == updateKeys[j]) {
                            const totalValue = valuesInventory[i] + updatevalues[j];
                            keysTotal.push(totalValue);
                        }
                    }
                }
                updateKeys.forEach((element, index) => {
                    updateObject[element] = keysTotal[index];
                });

                const updateData = await bloodInventoryServices.bloodInventoryChange(bankId, updateObject)
                res.json({
                    msg: RESPONSE.DATA_UPDATED
                });

            }
            else {
                res.send("Negative values are not allow");
            }


        }
        else {
            res.send("you need to create inventory first");
        }
    }
    else {
        res.json({
            msg: RESPONSE.PERMISSSION_DENIED
        });
    }
}




/*************************************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to decrement Blood unit Data 
 * @description : This function to decrease a number of blood unit 
***************************************************************************/

exports.bloodInventoryDecrement = async (req, res) => {
    const bankId = req.data.id;
    const verifyBank = await service.findId(bankId);
    if (verifyBank.role == "blood_bank") {
        const bloodInventory = await bloodBankService.bloodInventoryById(bankId);
        if (bloodInventory != null) {
            let keysInventory = Object.keys(bloodInventory.dataValues);
            let updateKeys = Object.keys(req.body);
            let valuesInventory = Object.values(bloodInventory.dataValues);
            let updatevalues = Object.values(req.body);
            const dataFilter = updatevalues.filter((value, index) => {
                return value < 0;
            })
            if (dataFilter.length == 0) {
                let keysTotal = []
                const updateObject = {};
                for (let i = 0; i < keysInventory.length; i++) {
                    for (let j = 0; j < updateKeys.length; j++) {
                        if (keysInventory[i] == updateKeys[j]) {
                            const totalValue = valuesInventory[i] - updatevalues[j];
                            if (totalValue >= 0) {
                                keysTotal.push(totalValue);
                            }
                            else {
                                keysTotal = [];
                            }
                        }
                    }
                }
                if (updateKeys.length == keysTotal.length) {
                    updateKeys.forEach((element, index) => {
                        updateObject[element] = keysTotal[index];
                    });
                    const updateData = await bloodInventoryServices.bloodInventoryChange(bankId, updateObject)
                    res.json({
                        msg: RESPONSE.DATA_UPDATED
                    });
                }
                else {
                    res.json({
                        msg: RESPONSE.NOT_VALID_REQUEST
                    });
                }
            }
            else {
                res.send("Negative values are not allowed ");
            }
        }
        else {
            res.send("you need to create inventory first");
        }
    }
    else {
        res.json({
            msg: RESPONSE.PERMISSSION_DENIED
        });
    }
}





/***************************************************
 * blood price Inventory Controller
 * Creating blood banks price Inventory controller
*****************************************************/

exports.priceBloodInventory = async (req, res) => {
    const authId = req.data.id;
    const checkId = await service.findId(authId);
    if (checkId.role == "blood_bank") {
        if (checkId.user_status == "Active") {
            req.body.usersBloodBankId = req.data.id;
            req.body.created_by = req.data.username;
            req.body.updated_by = req.data.username;
            const findUserData = await bloodBankService.bloodPriceInventoryById(checkId.id);
            if (findUserData == null) {
                let updatevalues = Object.values(req.body);
                const dataFilter = updatevalues.filter((value, index) => {
                    return value < 0;
                });
                if (dataFilter.length == 0) {
                    const createInventory = await bloodBankService.bloodPriceInventoryCreation(req.body);
                    res.json({
                        msg: RESPONSE.CREATED_SUCCESS,
                        data: createInventory
                    });
                }
                else{
                    res.send("Enter negative values")
                }
                }
            else {
                res.send("you cant regenarate it but you can update it..")
            }
        }
        else {
            res.json({ msg: RESPONSE.NOT_PERMISION_TO_LOGIN });
        }
    }
    else {
        res.json({ msg: RESPONSE.PERMISSSION_DENIED });
    }
}
