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
            req.body.userId = req.data.id;
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


