const jwtValidation = require("../utils/jwtUtils");
const jwt = require("jsonwebtoken");
const {
  USERSTATUS,
  USER_ROLE,
  UNDEFINED,
} = require("../utils/responsesutil/enumUtils");
const RESPONSE = require("../utils/responsesutil/responseutils");

/****************************
 * Middelware for user login
 ****************************/

const loginMiddelware = async (req, res, next) => {
  const userData = req.body;
  const token = await jwtValidation.loginJwt(userData);
  req.token = token;
  next();
};

/******************************************************
 * Middelware for token verification data regestration
 ******************************************************/

const jwtVerification = async (req, res, next) => {
  const userToken = req.headers["authorization"];
  if (typeof userToken == UNDEFINED.NOT_DEFINE) {
    return res.json({
      message: RESPONSE.INVALID_TOKEN,
    });
  }
  const verifiedToken = await jwtValidation.verifyToken(userToken);
  if (
    verifiedToken instanceof jwt.JsonWebTokenError ||
    verifiedToken == undefined
  ) {
    return res.json({
      message: RESPONSE.INVALID_TOKEN,
    });
  }
  req.data = verifiedToken;
  next();
};

//Role base Middelware for user

const userRoleMiddelware = async (req, res, next) => {
  const token = req.data.id;
  const findRole = await jwtValidation.userRoleMiddelwareUtil(token);
  if (findRole instanceof jwt.JsonWebTokenError || findRole == undefined) {
    return res.json({
      message: RESPONSE.INVALID_TOKEN,
    });
  }
  if (!findRole) {
    return res.json({
      msg: RESPONSE.DATA_NOT_FOUND,
    });
  }
  if (findRole.role != USER_ROLE.USER) {
    return res.json({
      msg: RESPONSE.PERMISSSION_DENIED,
    });
  }
  next();
};

//Role base Middelware for blood_bank
const bloodBankRoleMiddelware = async (req, res, next) => {
  const token = req.data.id;
  const findRole = await jwtValidation.userRoleMiddelwareUtil(token);
  if (findRole instanceof jwt.JsonWebTokenError || findRole == undefined) {
    return res.json({
      message: RESPONSE.INVALID_TOKEN,
    });
  }
  if (!findRole) {
    return res.json({
      msg: RESPONSE.DATA_NOT_FOUND,
    });
  }
  if (
    findRole.role != USER_ROLE.BLOOD_BANK ||
    findRole.user_status != USERSTATUS.ACTIVE
  ) {
    return res.json({
      msg: RESPONSE.PERMISSSION_DENIED,
    });
  }
  next();
};

//Role base Middelware for superuser
const superuserRoleMiddelware = async (req, res, next) => {
  const token = req.data.id;
  const findRole = await jwtValidation.userRoleMiddelwareUtil(token);
  if (findRole instanceof jwt.JsonWebTokenError || findRole == undefined) {
    return res.json({
      message: RESPONSE.INVALID_TOKEN,
    });
  }
  if (!findRole) {
    return res.json({
      msg: RESPONSE.DATA_NOT_FOUND,
    });
  }
  if (findRole.role != USER_ROLE.SUPERUSER) {
    return res.json({
      msg: RESPONSE.PERMISSSION_DENIED,
    });
  }
  next();
};

module.exports = {
  loginMiddelware,
  superuserRoleMiddelware,
  jwtVerification,
  bloodBankRoleMiddelware,
  userRoleMiddelware,
};
