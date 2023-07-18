const service = require("../services/userServices")
const md5 = require('md5');



/**
 * userRegister Controller 
 * Creating Registration controller 
 * Response : res.status(200, 400, 403)
 * Request : name, lname, email, password, role, username, state, distt, is_deleted, created_by, updated_by, is_active, user_status
 */

exports.userRegister = (async (req, res) => {
    try {
        const users = await service.findUsername(req.body.username)
        const email = await service.findEmail(req.body.email)
        if(users==null){
            if(email==null){
                let userStatus = "Active";
            if (req.body.role == "blood_bank") {
                userStatus = "Deactivate";
            }

            const userInfo = {
                name: req.body.name,
                lname: req.body.lname,
                email: req.body.email,
                password: md5(req.body.password),
                role: req.body.role,
                username: req.body.username,
                state: req.body.state,
                distt: req.body.distt,
                is_deleted: "false",
                created_by: req.body.username,
                updated_by: req.body.username,
                is_active: "true",
                user_status: userStatus
            }
            const saveData = await service.userRegistrationData(userInfo);

                return res.status(200).json({ status: 200, data: saveData, message: "Succesfully User created" });
            }
            else{
                return res.status(403).json({ status: 403, data: null, message: "Email already exist" });
            }
        }
        else{
            return res.status(403).json({ status: 403, data: null, message: "Username already exist" });
        }
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

});

//************************************************Authentication Controller***************************************************** */

exports.userAuthentication = (service.userAuthenticationData);


//************************************************User Deletion Controller***************************************************** */

exports.userDeletion = (service.userDeletionData);

//************************************************User get Controller***************************************************** */

exports.userGet = (service.userGetData);






