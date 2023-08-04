const router = require('express').Router();
const userRoute = require("./userRoute");
const userDataRoute = require("./userDataRoute");
const superUserRoute = require("./superUserRoute");
const usermiddelware = require("../middelware/userMiddelware");
const bloodBankRoute = require("./bloodBankRoute");
const usersAction = require("./userActionRoutes");
const { userAction } = require('../models');



/**************************************************************************************************************
**********************************************************Users Routes****************************************
****************************************************************************************************************/ 


/*****************************************************
 * User Routes Registration*
 * @description creating user registration route
 * ****************************************************/
router.post("/register", userRoute.userRegisterRoute);

router.post("/superuser/register", usermiddelware.jwtVerification, superUserRoute.superUserRegister);


/*****************************************************
 * User Routes Auth*
 * @description creating user Authentication route
 * ****************************************************/
router.patch("/login", usermiddelware.loginMiddelware, userRoute.userAuthenticationRoute);



/*********************************************************
* Logout route
*********************************************************/ 
router.patch('/logout', usermiddelware.jwtVerification, userRoute.logout);



/*****************************************************
 * User Updation Route*
 * @description creating user update route
 * ****************************************************/
router.patch("/update",usermiddelware.jwtVerification ,userRoute.userUpdationRoute);



/*****************************************************
 * User Routes delete*
 * @description creating user Deletion route
 * ****************************************************/
router.delete("/delete", usermiddelware.jwtVerification, userRoute.userDeletionRoute);





/****************************************************
Users Data Routes
*****************************************************/

/**************************************************************
 * User Data Routes *
 * @description Getting all Data of users request no accepted
 * ************************************************************/



/****************************************************
All Requests 
*****************************************************/

router.get('/users/requests', usermiddelware.jwtVerification, userRoute.userAllRequests)
router.get('/users/requests/pending', usermiddelware.jwtVerification, userRoute.userPendingRequests)
router.get('/users/requests/accepted', usermiddelware.jwtVerification, userRoute.userAcceptedRequests)




/******************************************************
 * User Data Routes *
 * @description Getting Data of users
 * ****************************************************/


router.get("/", usermiddelware.jwtVerification, userDataRoute.userGetRoute);

/******************************************************
 * User request Routes *
 * @description user request for blood
 * ****************************************************/

router.post("/users/action/request", usermiddelware.jwtVerification, usersAction.usersActionRequest);


/*********************************************************
 * User Data Routes *
 * @description Getting all filtered Data of users by role
 * *********************************************************/

router.get("/filter/role", usermiddelware.jwtVerification, userDataRoute.userRoleFilter);


/*********************************************************
 * User Data Routes *
 * @description Shows about Pending payments 
 * *********************************************************/

router.get("/user/pending/payment", usermiddelware.jwtVerification, usersAction.userPaymentPending);   

/*********************************************************
 * User Request cancelation Routes *
 * @description user cancel request 
 * *********************************************************/

router.patch("/user/request/cancel", usermiddelware.jwtVerification, usersAction.userCancelRequest);


/*********************************************************
 * User Payment Routes *
 * @description user pay completion 
 * *********************************************************/

router.patch("/user/request/payment", usermiddelware.jwtVerification, usersAction.userPaymentRoute);


/*********************************************************
 * User donation request cancel Routes *
 * @description user cancel his request
 * *********************************************************/
router.patch("/user/donation/cancel", usermiddelware.jwtVerification, usersAction.userDonationCancel);




/*********************************************************
 * User Donation Routes *
 * @description user donnation Apply
 * *********************************************************/

router.post("/user/donation/request", usermiddelware.jwtVerification, usersAction.userDonationApply);
router.patch("/blood_bank/donation/", usermiddelware.jwtVerification, usersAction.userDonationAccept);
router.patch("/blood_bank/donation/action", usermiddelware.jwtVerification, usersAction.userDonationConfirmation);




/**************************************************************************************************************
**********************************************************Superuser Routes*************************************
***************************************************************************************************************/ 


/*********************************************************
 * blood bank pending request data *
 * @description Getting all filtered Data of pending blood by role
 **********************************************************/

router.get("/pending/blood_bank", usermiddelware.jwtVerification, superUserRoute.pendingRequest);



/*********************************************************
 * blood bank pending request accepttion *
**********************************************************/
router.patch("/pending/blood_bank/request", usermiddelware.jwtVerification, superUserRoute.requestAcception);



/*********************************************************
 * blood bank pending request decline *
 * *********************************************************/
router.delete("/pending/blood_bank/request", usermiddelware.jwtVerification, superUserRoute.requestDecline);






/**************************************************************************************************************
***************************************************** Blood Banks Routes **************************************
***************************************************************************************************************/ 


router.post("/blood_bank/details", usermiddelware.jwtVerification, bloodBankRoute.createDetailBloodBank);



router.get('/blood_bank/donation',usermiddelware.jwtVerification, usersAction.userDonationList);


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
* user Request Acception or decline route for blood bank
*********************************************************/ 
router.patch("/blood_bank/request", usermiddelware.jwtVerification, usersAction.userRequestAcception);

/*********************************************************
* create blood price Inventory
*********************************************************/ 
router.post("/blood_bank/price", usermiddelware.jwtVerification, bloodBankRoute.createBloodBankPriceInventory);


router.patch("/blood_bank/price", usermiddelware.jwtVerification, bloodBankRoute.bloodBankpriceInventoryUpdate);



module.exports = router;