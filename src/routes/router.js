const router = require('express').Router();
const userRoute = require("./userRoute")
const userDataRoute = require("./userDataRoute")
const usermiddelware = require("../middelware/userMiddelware")


/**************************************************
Users Routes
*****************************************************/ 


/*****************************************************
 * User Routes Registration*
 * @description creating user registration route
 * ****************************************************/
router.post("/register", usermiddelware, userRoute.userRegisterRoute);



/*****************************************************
 * User Routes Auth*
 * @description creating user Authentication route
 * ****************************************************/
router.patch("/login", userRoute.userAuthenticationRoute);



/*****************************************************
 * User Routes delete*
 * @description creating user Deletion route
 * ****************************************************/
router.delete("/delete", userRoute.userDeletionRoute);





/**************************************************
Users Data Routes
*****************************************************/ 


/*****************************************************
 * User Data Routes *
 * @description Getting all Data of users
 * ****************************************************/


router.get("/", userDataRoute.userGetRoute);



/*********************************************************
 * User Data Routes *
 * @description Getting all filtered Data of users by role
 * *********************************************************/

router.get("/filter/role", userDataRoute.userRoleFilter);





module.exports = router;