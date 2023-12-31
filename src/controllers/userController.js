const service = require("../services/userServices");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const RESPONSE = require("../utils/responsesutil/responseutils");
const STATUS_CODE = require("../utils/responsesutil/statusCodeUtils");
const userActionRoutes = require("../services/userAction");
const Joi = require("joi");
const ENUM = require("../utils/responsesutil/enumUtils");
const {response} = require("../utils/responsesutil/resUtils");

/*************************************************************************************************************************************
 * userRegister Schema for Joi Validations
 **************************************************************************************************************************************/

const userRegistrationSchema = Joi.object({
  username: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().min(5).max(50).required(),
  name: Joi.string().min(3).max(40).required(),
  role: Joi.string().min(3).max(40).required(),
  lname: Joi.string().min(3).max(40).required(),
  state: Joi.string().max(15).required(),
  distt: Joi.string().max(15).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
}).options({ abortEarly: false });

/*************************************************************************************************************************************
 * user Updation Schema for Joi Validations
 **************************************************************************************************************************************/

const userUpdationSchema = Joi.object({
  username: Joi.string().min(5).max(30).optional().allow(null),
  email: Joi.string().email().min(5).max(50).optional().allow(null),
  name: Joi.string().min(3).max(40).optional().allow(null),
  lname: Joi.string().min(3).max(40).optional().allow(null),
  state: Joi.string().max(15).optional().allow(null),
  distt: Joi.string().max(15).optional().allow(null),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
}).options({ abortEarly: false });

/*************************************************************************************************************************************
 * userRegister Controller
 * Creating Registration controller
 * Response : res.status(200, 400, 403)
 * Request : name, lname, email, password, role, username, state, distt, is_deleted, created_by, updated_by, is_active, user_status
 **************************************************************************************************************************************/

exports.userRegister = async (req, res) => {
  try {
    const { name, lname, email, password, username, role, state, distt } = req.body;
    const userInfo = {
      name,
      lname,
      email,
      password,
      username,
      role,
      state,
      distt,
    };
    const { error } = userRegistrationSchema.validate(userInfo); //Joi Validations
    if (error) {
      return res.json({ msg: error.details[0].message });
    }
    const [userName, userEmail] = await Promise.all([
      service.findOneUser({ username: username }),
      service.findOneUser({ email: email }),
    ]);
    if (userName != null || userEmail != null) {
      return res
        .status(403)
        .json({ status: 403, data: null, message: RESPONSE.USERNAME_EXIST });
    }
    if(role ==  ENUM.USER_ROLE.SUPERUSER ){
      return res.json({ msg: RESPONSE.PERMISSSION_DENIED })
    }
    let userStatus = role == ENUM.USER_ROLE.BLOOD_BANK ? ENUM.USERSTATUS.DEACTIVE : ENUM.USERSTATUS.ACTIVE;
    const userStaticInfo = {
      is_deleted: ENUM.ACTIVE.FALSE,
      created_by: username,
      updated_by: username,
      is_active: ENUM.ACTIVE.TRUE,
      user_status: userStatus,
    };
    userInfo.password = md5(password);
    const saveData = await service.userRegistrationData({...userInfo, ...userStaticInfo});
    return response(res, saveData, RESPONSE.REGISTER_SUCCESSFULLY, STATUS_CODE.SUCCESS);
  } catch (e) {
      return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*************************************************************************************************************************************
 * userRegister Controller  for Superuser
 * Creating Registration controller  for super user
 * Response : res.status(200, 400, 403)
 * Request : name, lname, email, password, username, state, distt, is_deleted, created_by, updated_by, is_active, user_status
 **************************************************************************************************************************************/
exports.superUserRegister = async (req, res) => {
  try {
    const { name, lname, email, password, username, role, state, distt } =
      req.body;
    const userInfo = {
      name,
      lname,
      email,
      password,
      username,
      role,
      state,
      distt,
    };
    const { error } = userRegistrationSchema.validate(userInfo); //joi Validations
    if (error) {
      return res.json({ msg: error.details[0].message });
    }
    const [userName, userEmail] = await Promise.all([
      service.findOneUser({ username: username }),
      service.findOneUser({ email: email }),
    ]);
    if (userName != null || userEmail != null) {
      return res
        .status(403)
        .json({ status: 403, data: null, message: RESPONSE.USERNAME_EXIST });
    }
    let userStatus = ENUM.USERSTATUS.ACTIVE;
    const userStaticInfo = {
      is_deleted: ENUM.ACTIVE.TRUE,
      created_by: username,
      updated_by: username,
      is_active: ENUM.ACTIVE.TRUE,
      user_status: userStatus,
    };
    const saveData = await service.userRegistrationData({...userInfo, ...userStaticInfo});
    return res.status(200).json({
      status: 200,
      data: saveData,
      message: RESPONSE.REGISTER_SUCCESSFULLY,
    });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*********************************************************************************************************************************************
 * userAuthentication Controller
 * Creating Authentication controller
 * @Response : res.status(200, 403, 202)
 * @Request : password, username
 *********************************************************************************************************************************************/

exports.userAuthentication = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await service.findOneUser({ username: username });
    if (users == null) {
      return res.status(403).json({
        status: 403,
        data: users,
        message: RESPONSE.USERNAME_NOT_VALID,
      });
    }
    if (users.user_status != ENUM.USERSTATUS.ACTIVE) {
      return res.status(202).json({
        status: 202,
        data: null,
        message: RESPONSE.NOT_PERMISION_TO_LOGIN,
      });
    }
    if (users.password != md5(password)) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: RESPONSE.PASSWORD_INCORRECT,
      });
    }
    const loginData = await service.userAuthentication(username);
    return response(res, req.token, RESPONSE.LOGIN_SUCCESSFULLY, STATUS_CODE.SUCCESS);
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/****************************************************************************************************************************************************
 * userDeletion Controller
 * Creating soft Deletion controller
 * @Response : res.status(202, 204, 403)
 * @Request : password, username
 ******************************************************************************************************************************************************/

exports.userDeletion = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await service.findOneUser({ username: username });
    if (user == null) {
      return res.status(403).json({
        status: 403,
        data: user,
        message: RESPONSE.USERNAME_NOT_VALID,
      });
    }
    if (req.data.id != user.id) {
      return res
        .status(403)
        .json({ status: 403, message: RESPONSE.PERMISSSION_DENIED });
    }
    if (user.user_status != ENUM.USERSTATUS.ACTIVE) {
      return res.status(202).json({
        status: 202,
        data: null,
        message: RESPONSE.NOT_PERMISION_TO_LOGIN,
      });
    }
    if (user.password != md5(password)) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: RESPONSE.PASSWORD_INCORRECT,
      });
    }
    const userDelete = await service.userDeletion(username);
    return res
      .status(202)
      .json({ status: 204, data: null, message: RESPONSE.DELETION_COMPLETE });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*************************************************************************************************************************************************************
 * superuserDeletion Controller
 * Delete any account
 * @Response : res.status(202, 204)
 * @Request : password, username
 ***************************************************************************************************************************************************/
exports.superuserDeletion = async (req, res) => {
  try {
    const { username } = req.body;
    const findUser = await service.findOneUser({ id: req.data.id });
    if (findUser.role != ENUM.USER_ROLE.SUPERUSER) {
      return res.status(202).json({
        status: 202,
        data: null,
        message: RESPONSE.PERMISSSION_DENIED,
      });
    }
    const userDelete = await service.userDeletion(username);
    return res
      .status(202)
      .json({ status: 204, data: null, message: RESPONSE.DELETION_COMPLETE });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/***********************************************
 * userUpdation Controller
 * Creating update controller
 * @Response : res.status(202, 204, 403, )
 * @Request : password, username
 ***************************************************/
exports.userUpdation = async (req, res) => {
  try {
    const { name, lname, email, password, username, role, state, distt } =
      req.body;
    const userInfo = {
      name,
      lname,
      email,
      password,
      username,
      role,
      state,
      distt,
    };
    const { error } = userUpdationSchema.validate(userInfo);
    if (error) {
      return res.json({ msg: error.details[0].message });
    }
    const [dataId] = await Promise.all([service.findId(tokenData)]);
    const tokenData = req.data.id;
    const updateData = req.body;
    updateData.updated_by = dataId.username;
    if (updateData.password) {
      updateData.password = md5(updateData.password);
    }
    const updationData = await service.userUpdation(updateData, tokenData);
    return res.status(202).json({
      status: 202,
      data: updationData,
      message: RESPONSE.DATA_UPDATED,
    });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*****************************************************
 * User data Controllers*
 * @description creating user data routes
 * ****************************************************/

/**
 * userGet
 * Get single data from db
 * @Response : res.status(200)
 */

exports.userUniqueGet = async (req, res) => {
  try {
    const userUnique = await service.findOneUser({ id: req.data.id });
    return res
      .status(200)
      .json({ status: 200, data: userUnique, message: RESPONSE.DATA_GET });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/************************************
 * userGet
 * Get all data from db
 * @Response : res.status(200)
 ************************************/

exports.userGet = async (req, res) => {
  try {
    const users = await service.usersGetData();
    return res
      .status(200)
      .json({ status: 200, data: users, message: RESPONSE.DATA_GET });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/***************************************************
 * user role Filter Controller
 * @Request role
 * @Response : res.status(200, 404)
 * @description : provide data on a specific role
 ***************************************************/

exports.userRoleFilter = async (req, res) => {
  try {
    const { role } = req.body;
    if (role != ENUM.USER_ROLE.BLOOD_BANK) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: RESPONSE.PERMISSSION_DENIED,
      });
    }
    const dataRole = await service.findUser({
      role: req.body.role,
      user_status: ENUM.USERSTATUS.ACTIVE,
    });
    const dataRoleCondition =
      dataRole[0] != null
        ? res
            .status(200)
            .json({ status: 200, data: dataRole, message: RESPONSE.DATA_GET })
        : res.status(404).json({
            status: STATUS_CODE.NOT_FOUND,
            data: dataRole,
            message: RESPONSE.DATA_NOT_FOUND,
          });
    return dataRoleCondition;
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

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
    const bloodBankList = await service.findUser({
      role: ENUM.USER_ROLE.BLOOD_BANK,
      user_status: ENUM.USERSTATUS.ACTIVE,
    });
    res.json({
      msg: RESPONSE.DATA_GET,
      data: bloodBankList,
    });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*****************************************************************
 * blood bank request Decline Controller
 * @description This controller for blood banks request rejection
 *****************************************************************/

exports.requestDecline = async (req, res) => {
  try {
    if (req.body.request != ENUM.REQUEST.DECLINE) {
      res.json({ msg: RESPONSE.NOT_VALID_REQUEST });
    }
    const user = await service.findId(req.body.id);
    if (user == null) {
      res.json({ status: STATUS_CODE.NOT_FOUND, message: RESPONSE.DATA_NOT_FOUND });
    }
    if (user.role != ENUM.USER_ROLE.BLOOD_BANK) {
      res.json({ MSG: RESPONSE.PEE });
    }
    const userDelete = await service.userDeletion(user.username);
    res.json({ msg: RESPONSE.BLOOD_BANK_REQUEST_REJECTED });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*****************************************************************
 * blood bank request Acception Controller
 * @description This controller for blood banks request Acception
 ******************************************************************/

exports.requestAcception = async (req, res) => {
  try {
    if (req.body.request != ENUM.REQUEST.ACCEPT) {
      return res.json({ msg: RESPONSE.NOT_VALID_REQUEST });
    }
    const user = await service.findOneUser({ id: req.body.id });
    if (user == null) {
      return res.json({status: STATUS_CODE.NOT_FOUND, message: RESPONSE.DATA_NOT_FOUND });
    }
    if (user.role != ENUM.USER_ROLE.BLOOD_BANK) {
      return res.json({ MSG: RESPONSE.DATA_GET });
    }
    const updateData = {
      user_status: ENUM.USERSTATUS.ACTIVE,
      updated_by: req.data.username,
    };
    const updationData = await service.userUpdation(updateData, req.body.id);
    return res.json({ msg: RESPONSE.DATA_GET, data: updationData });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*****************************************************************
 * Showing all requests
 * **************************************************************/

exports.userAllRequests = async (req, res) => {
  try {
    const userId = req.data.id;
    const findData = await userActionRoutes.requestFind({ UserId: userId });
    return res.json({ data: findData });
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*****************************************************************
 * Showing all requests for blood request
 * **************************************************************/

exports.userPendingRequests = async (req, res) => {
  try {
    const userId = req.data.id;
    const findData = await userActionRoutes.requestFind({
      UserId: userId,
      action: ENUM.USERREQUESTTYPE.REQUEST,
      status: null,
    });
    return res.send(findData);
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};

/*****************************************************************
 * Showing all requests which are accepted blood request
 * **************************************************************/

exports.userAcceptedRequests = async (req, res) => {
  try {
    const userId = req.data.id;
    const findData = await userActionRoutes.requestFind({
      UserId: userId,
      action: ENUM.USERREQUESTTYPE.REQUEST,
      status: ENUM.REQUESTSTATUS.ACCEPT,
    });
    return res.send(findData);
  } catch (e) {
    return response(res, null, RESPONSE.EXCEPTION_ERROR, STATUS_CODE.EXCEPTION_ERROR);
  }
};


