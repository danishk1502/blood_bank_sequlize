const service = require("../services/userServices");
const bloodBankService = require("../services/bloodBankServices");
const responseJson = require("../utils/responseUtils");
const bloodInventory = require("../services/bloodInventoryServices")




exports.userRequestAction= async(req, res)=>{
    const username = req.body.blood_bank_username;
    
    // console.log(bloodGroup);
    const bloodBankDetails = await service.findUsername(username);
    if(bloodBankDetails.role == "blood_bank"){
        const bloodBankInventory = await bloodInventory.bloodInventorySearch(bloodBankDetails.id);
        const bloodGroup =req.body.blood_group;
        if(bloodBankInventory[bloodGroup]!==0){
            totalBloodUnit ={blood:bloodBankInventory[bloodGroup]}
            if (totalBloodUnit.blood<6){
                res.json({msg : "Total blood unit available " +totalBloodUnit.blood });
            }

           
        }
        else{
            res.send("Sorry Blood unit are not available");
        }
    }
    else{
        res.send("sorry choose correct bank")
    }
}