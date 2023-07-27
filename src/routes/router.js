const router = require('express').Router();
const userRoute = require("./userRoute")
const userDataRoute = require("./userDataRoute")
const superUserRoute = require("./superUserRoute")
const usermiddelware = require("../middelware/userMiddelware")
const bloodBankRoute = require("./bloodBankRoute");
// const bloodbank = require("../controllers/userActionController")
const usersAction = require("./userActionRoutes");



/**************************************************************************************************************
**********************************************************Users Routes****************************************
****************************************************************************************************************/ 


/*****************************************************
 * User Routes Registration*
 * @description creating user registration route
 * ****************************************************/
router.post("/register", usermiddelware.data, userRoute.userRegisterRoute);




/*****************************************************
 * User Routes Auth*
 * @description creating user Authentication route
 * ****************************************************/
router.patch("/login", usermiddelware.loginMiddelware, userRoute.userAuthenticationRoute);




/*****************************************************
 * User Updation Route*
 * @description creating user update route
 * ****************************************************/
router.patch("/update",usermiddelware.updateMiddelware ,userRoute.userUpdationRoute);



/*****************************************************
 * User Routes delete*
 * @description creating user Deletion route
 * ****************************************************/
router.delete("/delete", usermiddelware.jwtVerification, userRoute.userDeletionRoute);





/****************************************************
Users Data Routes
*****************************************************/ 


/*****************************************************
 * User Data Routes *
 * @description Getting all Data of users
 * ****************************************************/


router.get("/", usermiddelware.jwtVerification, userDataRoute.userGetRoute);



/*********************************************************
 * User Data Routes *
 * @description Getting all filtered Data of users by role
 * *********************************************************/

router.get("/filter/role", userDataRoute.userRoleFilter);


/*********************************************************
 * User Data Routes *
 * @description Shows about Pending payments 
 * *********************************************************/

router.get("/user/pending/payment", usermiddelware.jwtVerification, usersAction.userPaymentPending);











/**************************************************************************************************************
**********************************************************Superuser Routes*************************************
***************************************************************************************************************/ 


/*********************************************************
 * blood bank pending request data *
 * @description Getting all filtered Data of users by role
 * *********************************************************/

router.get("/pending/blood_bank", usermiddelware.jwtVerification, superUserRoute.pendingRequest);



/*********************************************************
 * blood bank pending request accepttion *
 * *********************************************************/

router.patch("/pending/blood_bank/request", usermiddelware.jwtVerification, superUserRoute.requestAcception);


/*********************************************************
 * blood bank pending request decline *
 * *********************************************************/
router.delete("/pending/blood_bank/request", usermiddelware.jwtVerification, superUserRoute.requestDecline);












/**************************************************************************************************************
***************************************************** Blood Banks Routes **************************************
***************************************************************************************************************/ 


router.post("/blood_bank/details", usermiddelware.jwtVerification, bloodBankRoute.createDetailBloodBank);
router.post("/users/action/request", usermiddelware.jwtVerification, usersAction.usersActionRequest);


/*********************************************************
* Blood Banks blood Inventory  Routes 
*********************************************************/ 

router.patch("/blood_bank/inventory", usermiddelware.jwtVerification, bloodBankRoute.updateBloodInventory);
router.post("/blood_bank/inventory", usermiddelware.jwtVerification, bloodBankRoute.createBloodBankInventory);
router.patch("/blood_bank/inventory/increment", usermiddelware.jwtVerification, bloodBankRoute.incrementBloodInventory);
router.patch("/blood_bank/inventory/decrement", usermiddelware.jwtVerification, bloodBankRoute.decrementBloodInventory);


/*********************************************************
* user Request list for blood bank
*********************************************************/ 
router.get("/blood_bank/request", usermiddelware.jwtVerification, usersAction.usersActionList);

/*********************************************************
* user Request Acception route for blood bank
*********************************************************/ 
router.patch("/blood_bank/request", usermiddelware.jwtVerification, usersAction.userRequestAcception);

/*********************************************************
* create blood price Inventory
*********************************************************/ 
router.post("/blood_bank/price", usermiddelware.jwtVerification, bloodBankRoute.createBloodBankPriceInventory);










module.exports = router;