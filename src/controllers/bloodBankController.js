const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const bloodInventoryServices = require('../services/bloodInventoryServices');
const RESPONSE = require("../utils/responsesutil/responseutils");
const STATUS_CODE = require("../utils/responsesutil/statusCodeUtils");



/********************************************
 * blood Bank Detail Controller
 * Creating blood banks details controller
*********************************************/

exports.bloodBankDetails = async (req, res) => {
    try {
        const authId = req.data.id;
        const checkId = await service.findUser({id : authId});
        if (checkId.role != "blood_bank") {return res.json({msg: RESPONSE.PERMISSSION_DENIED});
        }
        if (checkId.user_status != "Active") {
            return res.json({
                msg: RESPONSE.NOT_PERMISION_TO_LOGIN,
            });
        }
        req.body.created_by = req.data.username;
        req.body.updated_by = req.data.username;
        req.body.UserId = req.data.id;
        const findUserData = await bloodBankService.bloodDetailById(checkId.id);
        if (findUserData == null) {
            const createDetails = await bloodBankService.addBloodBankDetails(req.body);
            return res.json({
                msg: RESPONSE.CREATED_SUCCESS,
                data: createDetails
            });
        }
        else {
            return res.json({
                msg: RESPONSE.REGENERATE_INVENTORY
            })
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}


/********************************************
 * blood Bank update details Controller
 * Creating blood banks update details controller
*********************************************/

exports.bloodBankUpdateDetails = async (req, res) => {
    try {
        const authId = req.data.id;
        const checkId = await service.findUser({id : authId});
        if (checkId.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.PERMISSSION_DENIED
            });
        }
        if (checkId.user_status != "Active") {
            return res.json({
                msg: RESPONSE.NOT_PERMISION_TO_LOGIN,
            });
        }
        req.body.created_by = req.data.username;
        req.body.updated_by = req.data.username;
        req.body.UserId = req.data.id;
            const createDetails = await bloodBankService.addBloodBankDetails(req.body, req.data.id);
            return res.json({
                msg: RESPONSE.CREATED_SUCCESS,
                data: createDetails
            });

        }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}




/*********************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller
***********************************************/

exports.bloodBankInventory = async (req, res) => {
    try {
        const authId = req.data.id;
        const checkId = await service.findUser({id : authId});
        if (checkId.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.PERMISSSION_DENIED
            });
        }
        if (checkId.user_status != "Active") {
            return res.json({
                msg: RESPONSE.NOT_PERMISION_TO_LOGIN
            });
        }
        req.body.UserId = req.data.id;
        req.body.created_by = req.data.username;
        req.body.updated_by = req.data.username;
        const findUserData = await bloodBankService.bloodInventoryById(checkId.id);
        if (findUserData != null) {
            return res.json({
                msg: RESPONSE.REGENERATE_INVENTORY
            });

        }
        let updatevalues = Object.values(req.body);
        const dataFilter = updatevalues.filter((value, index) => {
            return value < 0;
        })

        if (dataFilter.length != 0) {
            return res.json({
                msg: RESPONSE.NEGATIVE_VALUES
            });

        }
        const createInventory = await bloodBankService.bloodInventoryCreation(req.body);

        return res.json({
            msg: RESPONSE.CREATED_SUCCESS,
            data: createInventory
        });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}





/***********************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to update Data 
************************************************************/

exports.bloodBankInventoryUpdate = async (req, res) => {
    try {
        const bankId = req.data.id;
        const verifyBank = await service.findUser({id : bankId});
        if (verifyBank.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.PERMISSSION_DENIED
            });
        }
        const findInventory = await bloodBankService.bloodInventoryById(bankId);
        if (findInventory == null) {
            return res.send("");
        }
        const updateData = await bloodInventoryServices.bloodInventoryChange(bankId, req.body)
        return res.json({
            msg: RESPONSE.DATA_UPDATED,
            data: updateData
        });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}





/**************************************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to Increment Blood unit Data 
 * * @description : This function to add a number of blood unit 
*****************************************************************************/
exports.bloodInventoryIncrement = async (req, res) => {
    try {
        const bankId = req.data.id;
        const verifyBank = await service.findUser({id : bankId})
        if (verifyBank.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.PERMISSSION_DENIED
            });
        }
        const bloodInventory = await bloodBankService.bloodInventoryById(bankId);
        if (bloodInventory == null) {
            return res.JSON({
                msg: RESPONSE.CREATE_INVENTORY
            });
        }
        let keysInventory = Object.keys(bloodInventory.dataValues);
        let updateKeys = Object.keys(req.body);
        let valuesInventory = Object.values(bloodInventory.dataValues);
        let updatevalues = Object.values(req.body);
        const dataFilter = updatevalues.filter((value, index) => {
            return value < 0;
        });
        if (dataFilter.length == 0) {
            return res.json({
                msg: RESPONSE.NEGATIVE_VALUES
            });
        }
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
        return res.json({
            msg: RESPONSE.DATA_UPDATED
        });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}




/*************************************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to decrement Blood unit Data 
 * @description : This function to decrease a number of blood unit 
***************************************************************************/
exports.bloodInventoryDecrement = async (req, res) => {
    try {
        const bankId = req.data.id;
        const verifyBank = await service.findUser({id : bankId});
        if (verifyBank.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.PERMISSSION_DENIED
            });
        }
        const bloodInventory = await bloodBankService.bloodInventoryById(bankId);
        if (bloodInventory == null) {
            return res.JSON({
                msg: RESPONSE.CREATE_INVENTORY
            });
        }
        let keysInventory = Object.keys(bloodInventory.dataValues);
        let updateKeys = Object.keys(req.body);
        let valuesInventory = Object.values(bloodInventory.dataValues);
        let updatevalues = Object.values(req.body);
        const dataFilter = updatevalues.filter((value, index) => {
            return value < 0;
        })
        if (dataFilter.length != 0) {
            return res.json({
                msg: RESPONSE.NEGATIVE_VALUES
            });
        }
        let keysTotal = []
        const updateObject = {};
        for (let i = 0; i < keysInventory.length; i++) {
            for (let j = 0; j < updateKeys.length; j++) {
                if (keysInventory[i] == updateKeys[j]) {
                    const totalValue = valuesInventory[i] - updatevalues[j];
                    const totalKey = totalValue >= 0 ? keysTotal.push(totalValue) : keysTotal = [];
                }
            }
        }
        if (updateKeys.length != keysTotal.length) {
            return res.json({
                msg: RESPONSE.NOT_VALID_REQUEST
            });
        }
        updateKeys.forEach((element, index) => {
            updateObject[element] = keysTotal[index];
        });
        const updateData = await bloodInventoryServices.bloodInventoryChange(bankId, updateObject)
        return res.json({
            msg: RESPONSE.DATA_UPDATED
        });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}





/***************************************************
 * blood price Inventory Controller
 * Creating blood banks price Inventory controller
*****************************************************/
exports.priceBloodInventory = async (req, res) => {
    try {
        const authId = req.data.id;
        const checkId = await service.findUser({id : authId});
        if (checkId.role != "blood_bank") {
            return res.json({ msg: RESPONSE.PERMISSSION_DENIED });
        }
        if (checkId.user_status != "Active") {
            return res.json({ msg: RESPONSE.NOT_PERMISION_TO_LOGIN });
        }
        req.body.UserId = req.data.id;
        req.body.created_by = req.data.username;
        req.body.updated_by = req.data.username;
        const findUserData = await bloodBankService.bloodPriceInventoryById(checkId.id);
        if (findUserData != null) {
            return res.json({
                msg: RESPONSE.REGENERATE_INVENTORY
            });
        }
        let updatevalues = Object.values(req.body);
        const dataFilter = updatevalues.filter((value, index) => {
            return value < 0;
        });
        if (dataFilter.length != 0) {
            return res.json({
                msg: RESPONSE.NEGATIVE_VALUES
            });
        }
        const createInventory = await bloodBankService.bloodPriceInventoryCreation(req.body);
        return res.json({
            msg: RESPONSE.CREATED_SUCCESS,
            data: createInventory
        });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/***********************************************************
 * blood Inventory Controller
 * Creating blood banks Inventory controller to update Data 
************************************************************/

exports.bloodBankpriceInventoryUpdate = async (req, res) => {
    try {
        const bankId = req.data.id;
        const verifyBank = await service.findUser({id : bankId});
        if (verifyBank.role != "blood_bank") {
            return res.json({
                msg: RESPONSE.PERMISSSION_DENIED
            });
        }
        const findInventory = await bloodBankService.priceInventorybyId(bankId);
        if (findInventory == null) {
            return res.send("");
        }
        const updateData = await bloodInventoryServices.priceInventoryChange(bankId, req.body)
        return res.json({
            msg: RESPONSE.DATA_UPDATED,
            data: updateData
        });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}

