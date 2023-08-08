const service = require("../services/userServices");
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const RESPONSE = require("../utils/responsesutil/responseutils");
const STATUS_CODE = require("../utils/responsesutil/statusCodeUtils");
const userActionRoutes = require('../services/userAction');
const Joi = require('joi');




/*************************************************************************************************************************************
* userRegister Schema for Joi Validations  
**************************************************************************************************************************************/

const userRegistrationSchema = ((data) => {
    const JoiSchema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().min(5).max(50).required(),
        name: Joi.string().min(3).max(40).required(),
        role: Joi.string().min(3).max(40).required(),
        lname: Joi.string().min(3).max(40).required(),
        state: Joi.string().max(15).required(),
        distt: Joi.string().max(15).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
    }).options({ abortEarly: false });
    return JoiSchema.validate(data)
})


/*************************************************************************************************************************************
* userRegister Controller 
* Creating Registration controller 
* Response : res.status(200, 400, 403)
* Request : name, lname, email, password, role, username, state, distt, is_deleted, created_by, updated_by, is_active, user_status
**************************************************************************************************************************************/

exports.userRegister = (async (req, res) => {
    try {
        const { name, lname, email, password, username, role, state, distt } = req.body;
        const userInfo = {
            name, lname, email, password, username, role, state, distt
        }
        const [joiValidation, userName, userEmail] = await Promise.all([
            userRegistrationSchema(userInfo),
            service.findUsername(username),
            service.findEmail(email)
        ]);
        if (joiValidation.error) { return res.json({ status: 412, msg: joiValidation.error.details[0].message }) }
        if (userName != null) { return res.status(403).json({ status: 403, data: null, message: RESPONSE.USERNAME_EXIST }); }
        if (userEmail != null) { return res.status(403).json({ status: 403, data: null, message: RESPONSE.EMAIL_EXIST }); }
        let userStatus = "Active";
        if (role == "superuser") { return res.json({ msg: RESPONSE.PERMISSSION_DENIED }); }
        if (req.body.role == "blood_bank") { userStatus = "Deactivate"; }
        const userStaticInfo = { is_deleted: "false", created_by: username, updated_by: username, is_active: "true", user_status: userStatus }
        Object.assign(userInfo, userStaticInfo);
        const saveData = await service.userRegistrationData(userInfo);
        return res.status(STATUS_CODE.SUCCESS).json({ status: STATUS_CODE.SUCCESS, data: saveData, message: RESPONSE.REGISTER_SUCCESSFULLY });
    } catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
});


/*************************************************************************************************************************************
 * userRegister Controller  for Superuser 
 * Creating Registration controller  for super user 
 * Response : res.status(200, 400, 403)
 * Request : name, lname, email, password, username, state, distt, is_deleted, created_by, updated_by, is_active, user_status
 **************************************************************************************************************************************/
exports.superUserRegister = (async (req, res) => {
    try {
        const { name, lname, email, password, username, role, state, distt } = req.body;
        const userInfo = {
            name, lname, email, password, username, role, state, distt
        };
        const [joiValidation, userName, userEmail, activeUser] = await Promise.all([
            userRegistrationSchema(userInfo),
            service.findUsername(username),
            service.findEmail(email),
            service.findId(req.data.id)
        ]);
        if (joiValidation.error) { return res.json({ status: 412, msg: joiValidation.error.details[0].message }) }
        if (userName != null) { return res.status(403).json({ status: 403, data: null, message: RESPONSE.USERNAME_EXIST }); }
        if (userEmail != null) { return res.status(403).json({ status: 403, data: null, message: RESPONSE.EMAIL_EXIST }); }
        if (activeUser.role != "superuser") { res.json({ msg: RESPONSE.PERMISSSION_DENIED }) }
        let userStatus = "Active";
        const userStaticInfo = { is_deleted: "false", created_by: username, updated_by: username, is_active: "true", user_status: userStatus }
        Object.assign(userInfo, userStaticInfo);
        const saveData = await service.userRegistrationData(userInfo);
        return res.status(200).json({ status: 200, data: saveData, message: RESPONSE.REGISTER_SUCCESSFULLY });
    } catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }

});



/*****************************************
 * userAuthentication Controller 
 * Creating Authentication controller 
 * @Response : res.status(200, 403, 202)
 * @Request : password, username
 ******************************************/


exports.userAuthentication = (async (req, res) => {
    try {
        const users = await service.findUsername(req.body.username)
        if (users == null) { return res.status(403).json({ status: 403, data: users, message: RESPONSE.USERNAME_NOT_VALID }); }
        if (users.user_status != "Active") { return res.status(202).json({ status: 202, data: null, message: RESPONSE.NOT_PERMISION_TO_LOGIN }) }
        if (users.password != md5(req.body.password)) { return res.status(403).json({ status: 403, data: null, message: RESPONSE.PASSWORD_INCORRECT }); }
        const username = req.body.username;
        const loginData = await service.userAuthentication(username);
        return res.status(200).json({ status: 200, data: users, message: RESPONSE.LOGIN_SUCCESSFULLY, token: req.token });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
});


/************************************************
 * userDeletion Controller 
 * Creating soft Deletion controller 
 * @Response : res.status(202, 204, 403)
 * @Request : password, username
 ************************************************/

exports.userDeletion = (async (req, res) => {
    try {
        const user = await service.findUsername(req.body.username)
        if (user == null) { return res.status(403).json({ status: 403, data: user, message: RESPONSE.USERNAME_NOT_VALID }); }
        if (user.user_status != "Active") { return res.status(202).json({ status: 202, data: null, message: RESPONSE.NOT_PERMISION_TO_LOGIN }) }
        if (user.password != md5(req.body.password)) { return res.status(403).json({ status: 403, data: null, message: RESPONSE.PASSWORD_INCORRECT }); }
        const username = req.body.username;
        const userDelete = await service.userDeletion(username);
        return res.status(202).json({ status: 204, data: null, message: RESPONSE.DELETION_COMPLETE });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
});



/************************************************
 * superuserDeletion Controller 
 * Delete any account 
 * @Response : res.status(202, 204, 403, )
 * @Request : password, username
 ************************************************/
exports.superuserDeletion = (async (req, res) => {
    try {
        const findUser = await service.findId(req.data.id);
        if (findUser.role != "superuser") { return res.status(202).json({ status: 202, data: null, message: RESPONSE.PERMISSSION_DENIED }) }
        const username = req.body.username;
        const userDelete = await service.userDeletion(username);
        return res.status(202).json({ status: 204, data: null, message: RESPONSE.DELETION_COMPLETE });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
});



/***********************************************
* userUpdation Controller 
* Creating update controller 
* @Response : res.status(202, 204, 403, )
* @Request : password, username
***************************************************/
exports.userUpdation = (async (req, res) => {
    try {
        // const response = joiValidations.joiUpdateUtils(req.body);
        // if (response.error) { return res.json({ status: 412, msg: response.error.details[0].message }) }
        const tokenData = req.data.id;
        const dataId = await service.findId(tokenData);
        const updateData = req.body;
        updateData.updated_by = dataId.username;
        if (updateData.password) {
            updateData.password = md5(updateData.password);
        }
        const updationData = await service.userUpdation(updateData, tokenData);
        return res.status(202).json({ status: 202, data:updationData, message: RESPONSE.DATA_UPDATED });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
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
    try {
        const userUnique = await service.findId(req.data.id)
        return res.status(200).json({ status: 200, data: userUnique, message: RESPONSE.DATA_GET });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
});


/************************************
 * userGet   
 * Get all data from db
 * @Response : res.status(200)
 ************************************/

exports.userGet = (async (req, res) => {
    try {
        const users = await service.usersGetData()
        return res.status(200).json({ status: 200, data: users, message: RESPONSE.DATA_GET });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
});


/***************************************************
 * user role Filter Controller 
 * @Request role 
 * @Response : res.status(200, 404)
 * @description : provide data on a specific role
 ***************************************************/


exports.userRoleFilter = (async (req, res) => {
    try {
        if (req.body.role == "user" || req.body.role == "superuser") {
            return res.status(403).json({ status: 403, data: null, message: RESPONSE.PERMISSSION_DENIED });
        }
        else if (req.body.role == "blood_bank") {
            const dataRole = await service.userRoleFilter(req.body.role);
            const dataRoleCondition = dataRole != null ? res.status(200).json({ status: 200, data: dataRole, message: RESPONSE.DATA_GET }) : res.status(404).json({ status: 404, data: data, message: RESPONSE.DATA_NOT_FOUND })
            return dataRoleCondition;
        }
        else {
            return res.status(403).json({ status: 403, data: null, message: RESPONSE.NOT_VALID_REQUEST });
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}
);


/*****************************************************************************************************************************************************************
*******************************************************************Creating Superusers controllers****************************************************************
\****************************************************************************************************************************************************************/


/* ***********************************************************************************
 * blood bank Filter Controller 
 * @Request role 
 * @Response : res.status(200, 404)
 * @description : provide data of blood banks those registration request is pending
 **************************************************************************************/


exports.pendingRequest = async (req, res) => {
    try {
        const id = req.data.id;
        const userData = await service.findId(id);
        if (userData.role == "user" || userData.role == "blood_bank") {
            res.json({ msg: RESPONSE.PERMISSSION_DENIED });
        }
        else {
            const bloodBankList = await service.bloodBankPending("blood_bank");
            res.json({
                msg: RESPONSE.DATA_GET,
                data: bloodBankList
            });
        }
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/*****************************************************************
 * blood bank request Decline Controller 
 * @description This controller for blood banks request rejection
 *****************************************************************/

exports.requestDecline = async (req, res) => {
    try {
        const id = req.data.id;
        const userData = await service.findId(id);
        if (userData.role == "user" || userData.role == "blood_bank") { res.json({ msg: RESPONSE.PERMISSSION_DENIED }); }
        if (req.body.request != "Decline") { res.json({ msg: RESPONSE.NOT_VALID_REQUEST }); }
        const user = await service.findId(req.body.id)
        if (user == null) { res.json({ status: 404, message: RESPONSE.DATA_NOT_FOUND }); }
        if (user.role != "blood_bank") { res.json({ MSG: RESPONSE.PEE }); }
        const userDelete = await service.userDeletion(user.username);
        res.json({ msg: RESPONSE.BLOOD_BANK_REQUEST_REJECTED });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}


/*****************************************************************
 * blood bank request Acception Controller 
 * @description This controller for blood banks request Acception
 ******************************************************************/

exports.requestAcception = async (req, res) => {
    try {
        const id = req.data.id;
        const userData = await service.findId(id);
        if (userData.role == "user" || userData.role == "blood_bank") { return res.json({ msg: RESPONSE.PERMISSSION_DENIED }); }
        if (req.body.request != "Accept") { return res.json({ msg: RESPONSE.NOT_VALID_REQUEST }); }
        const user = await service.findId(req.body.id)
        if (user == null) { return res.json({ status: 404, message: RESPONSE.DATA_NOT_FOUND }); }
        if (user.role != "blood_bank") { return res.json({ MSG: RESPONSE.DATA_GET }); }
        const updateData = { user_status: "Active", updated_by: userData.username };
        const updationData = await service.userUpdation(updateData, req.body.id);
        return res.json({ msg: RESPONSE.DATA_GET, data: updationData });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}


/*****************************************************************
 * Showing all requests 
 * **************************************************************/

exports.userAllRequests = async (req, res) => {
    try {
        const findData = await userActionRoutes.userRequestUser(req.data.id);
        return res.json({ data: findData });
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/*****************************************************************
 * Showing all requests for blood request
 * **************************************************************/

exports.userPendingRequests = async (req, res) => {
    try {
        const findData = await userActionRoutes.userRequestsForBlood(req.data.id);
        return res.send(findData);
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }
}



/*****************************************************************
 * Showing all requests which are accepted blood request
 * **************************************************************/

exports.userAcceptedRequests = async (req, res) => {
    try {
        const findData = await userActionRoutes.userRequestsAccepted(req.data.id);
        return res.send(findData);
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }

}





/*****************************************************************
 * Logout api for users
 * **************************************************************/
exports.logout = async (req, res) => {
    try {
        const token = req.headers['authorization']
        jwt.sign(token, " ", { expiresIn: "1sec" }, (result, err) => {
            if (result) {
                // console.log(result)
                return res.json({ msg: RESPONSE.LOG_OUT })
            }
            else {

                return res.json({ msg: RESPONSE.PERMISSSION_DENIED })
            }

        })
    }
    catch (e) {
        return res.status(STATUS_CODE.EXCEPTION_ERROR).json({ status: STATUS_CODE.ERROR, message: RESPONSE.EXCEPTION_ERROR });
    }

}



