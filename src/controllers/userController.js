const service = require("../services/userServices");
const md5 = require('md5');
const responseJson = require("../utils/responseUtils")



/**
 * userRegister Controller 
 * Creating Registration controller 
 * Response : res.status(200, 400, 403)
 * Request : name, lname, email, password, role, username, state, distt, is_deleted, created_by, updated_by, is_active, user_status
 */

exports.userRegister = (async (req, res) => {
    try {
        const usernameInfo = await service.findUsername(req.body.username)
        const emailInfo = await service.findEmail(req.body.email)
        if (usernameInfo == null) {
            if (emailInfo == null) {
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
            else {
                return res.status(403).json({ status: 403, data: null, message: "Email already exist" });
            }
        }
        else {
            return res.status(403).json(responseJson.responseData("username already Exist"));
        }

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

});





/**
 * userAuthentication Controller 
 * Creating Authentication controller 
 * @Response : res.status(200, 403, 202)
 * @Request : password, username
 */


exports.userAuthentication = (async (req, res) => {
    const users = await service.findUsername(req.body.username)
    if (users != null) {
        if (users.user_status == "Active") {
            if (users.password == md5(req.body.password)) {
                const username = req.body.username;
                const loginData = await service.userAuthentication(username);
                return res.status(200).json({ status: 200, data: users, message: "User logged in", token: req.token });
            }
            else {
                return res.status(403).json({ status: 403, data: null, message: "Password Incorrect" });
            }
        }
        else {
            return res.status(202).json({ status: 202, data: null, message: "your bank's registration application is under progress" })
        }
    }
    else {
        return res.status(403).json({ status: 403, data: users, message: "Username Incorrect" });
    }
});


/**
 * userDeletion Controller 
 * Creating soft Deletion controller 
 * @Response : res.status(202, 204, 403, )
 * @Request : password, username
 */

exports.userDeletion = (async (req, res) => {
    const user = await service.findUsername(req.body.username)
    if (user != null) {
        if (user.user_status == "Active") {
            if (user.password == md5(req.body.password)) {
                const username = req.body.username;
                const userDelete = await service.userDeletion(username);
                return res.status(202).json({ status: 204, data: null, message: "Account Deleted" });
            }
            else {
                return res.status(403).json({ status: 403, data: null, message: "Password Incorrect" });
            }
        }
        else {
            return res.status(202).json({ status: 202, data: null, message: "your bank's registration application is under progress" })
        }
    }
    else {
        return res.status(403).json({ status: 403, data: user, message: "Username Incorrect" });
    }
});



/**
* userUpdation Controller 
* Creating update controller 
* @Response : res.status(202, 204, 403, )
* @Request : password, username
*/


exports.userUpdation = (async (req, res) => {
    const tokenData = req.data.id;
    const dataId = await service.findId(tokenData);
    const updateData = req.body;
    updateData.updated_by = dataId.username;
    if (updateData.password) {
        updateData.password = md5(updateData.password);
        console.log(updateData.password);
    }
    const updationData = await service.userUpdation(updateData, tokenData)
    res.json(updationData);

})






/*****************************************************
 * User data Controllers*
 * @description creating user data routes
 * ****************************************************/

/**
 * userGet   
 * Get single data from db
 * @Response : res.status(200)
 */
exports.userUniqueGet = (async (req, res) => {
    const userUnique = await service.findId(req.data.id)
    return res.status(200).json({ status: 200, data: userUnique, message: "All Data" });
});


/**
 * userGet   
 * Get all data from db
 * @Response : res.status(200)
 */

exports.userGet = (async (req, res) => {
    const users = await service.usersGetData()
    return res.status(200).json({ status: 200, data: users, message: "All Data" });
});


/**
 * user role Filter Controller 
 * @Request role 
 * @Response : res.status(200, 404)
 * @description : provide data on a specific role
 */


exports.userRoleFilter = (async (req, res) => {
    if (req.body.role == "user" || req.body.role == "superuser") {
        return res.status(403).json({ status: 403, data: null, message: "we cant show you the list" });
    }
    else if (req.body.role == "blood_bank") {
        const dataRole = await service.userRoleFilter(req.body.role);
        if (dataRole != null) {
            return res.status(200).json({ status: 200, data: dataRole, message: "Data of role :" + req.body.role });
        }
        else {
            return res.status(404).json({ status: 404, data: data, message: "Data Not Found" });
        }
    }
    else {
        return res.status(403).json({ status: 403, data: null, message: "Please make Valid request" });
    }


});




/*************************************************************************************************************************************************************

*******************************************************************Creating Superusers controllers**************************************************************

\****************************************************************************************************************************************************************/


/* 
/**
 * blood bank Filter Controller 
 * @Request role 
 * @Response : res.status(200, 404)
 * @description : provide data of blood banks those registration request is pending
 */


exports.pendingRequest = async (req, res) => {
    const id = req.data.id;
    const userData = await service.findId(id);
    if (userData.role == "user" || userData.role == "blood_bank") {
        res.json({ msg: "you are not eligible to view Data" });
    }
    else {

        const bloodBankList = await service.bloodBankPending("blood_bank");
        res.json(bloodBankList);
    }
}



/**
 * blood bank request Decline Controller 
 * @description This controller for blood banks request rejection
 */

exports.requestDecline = async (req, res) => {
    const id = req.data.id;
    const userData = await service.findId(id);
    if (userData.role == "user" || userData.role == "blood_bank") {
        res.json({ msg: "You are not able to make request" });
    }
    else {
        if (req.body.request == "Decline") {
            const user = await service.findId(req.body.id)
            if (user != null) {
                if(user.role == "blood_bank"){
                    const userDelete = await service.userDeletion(user.username);
                    res.json({msg : "Blood Banks Request rejected Successfully"});
                }
                else{
                    res.json("you can only update data of Blood Banks");
                }
            }
            else {
                res.json({ message: "user not exist on this id" });
            }
        }
        else {
            res.json({ msg: "Invalid Request" });
        }
    }


}


/**
 * blood bank request Acception Controller 
 * @description This controller for blood banks request Acception
 */

exports.requestAcception = async(req, res) => {
    const id = req.data.id;
    const userData = await service.findId(id);
    if (userData.role == "user" || userData.role == "blood_bank") {
        res.json({ msg: "You are not able to make request" });
    }
    else {
        if (req.body.request == "Accept") {
            const user = await service.findId(req.body.id)
            if (user != null) {
                if(user.role == "blood_bank"){
                    const updateData = {user_status: "Active", updated_by:"userData.username"};
                    const updationData = await service.userUpdation(updateData, req.body.id);
                    res.json({msg : "Blood Bank Activated Successfully", data:updationData});
                }
                else{
                    res.json("you can only update data of Blood Banks");
                }
            }
            else {
                res.json({ message: "user not exist on this id" });
            }
        }
        else {
            res.json({ msg: "Invalid Request" });
        }
    }

}




