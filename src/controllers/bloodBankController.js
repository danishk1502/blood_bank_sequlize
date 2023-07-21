const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const responseJson = require("../utils/responseUtils");





/**
 * blood Bank Detail Controller
 * Creating blood banks details controller
*/

exports.bloodBankDetails = async(req, res)=>{
    const authId = req.data.id;
    const checkId = await service.findId(authId);
    if(checkId.role == "blood_bank"){
        if(checkId.user_status == "Active"){
            req.body.usersBloodBankId = req.data.id;
            req.body.created_by = req.data.username;
            req.body.updated_by = req.data.username;

            const findUserData = await bloodBankService.bloodDetailById(checkId.id);
            if(findUserData==null){
                const createDetails = await bloodBankService.addBloodBankDetails(req.body);
                res.json(createDetails);
            }
            else{
                res.send("you cant regenarate it but you can update it..")
            }
        }
        else{
            res.send("Your Blood Bank is not regisster Yet");
        }
    }
    else{
        res.send("You are not eligible to make thhis request");
    }
}




/**
 * blood Inventory Controller
 * Creating blood banks Inventory controller
*/

exports.bloodBankInventory = async(req, res)=>{
    const authId = req.data.id;
    const checkId = await service.findId(authId);
    if(checkId.role == "blood_bank"){
        if(checkId.user_status == "Active"){
            req.body.usersBloodBankId = req.data.id;
            req.body.created_by = req.data.username;
            req.body.updated_by = req.data.username;

            const findUserData = await bloodBankService.bloodDetailById(checkId.id);
            if(findUserData==null){

                const createInventory = await bloodBankService.bloodInventoryCreation(req.body);

                res.json(createInventory);
            }
            else{
                res.send("you cant regenarate it but you can update it..")
            }
        }
        else{
            res.send("Your Blood Bank is not regisster Yet");
        }
    }
    else{
        res.send("You are not eligible to make thhis request");
    }
}
