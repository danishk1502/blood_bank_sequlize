const router = require('express').Router();
const userRoute = require("./userRoute")
const userDataRoute = require("./userDataRoute")
const usermiddelware = require("../middelware/userMiddelware")


/**************************************************
Users Routes
*****************************************************/ 


/*****************************************************
 * User Routes Registration*
 * @deprecated creating user registration route
 * ****************************************************/
router.post("/register", usermiddelware, userRoute.userRegisterRoute);



/*****************************************************
 * User Routes Auth*
 * @deprecated creating user Authentication route
 * ****************************************************/
router.patch("/login", userRoute.userAuthenticationRoute);



/*****************************************************
 * User Routes delete*
 * @deprecated creating user Deletion route
 * ****************************************************/
router.delete("/delete", userRoute.userDeletionRoute);





/**************************************************
Users Data Routes
*****************************************************/ 


/*****************************************************
 * User Data Routes *
 * @deprecated Getting all Data of users
 * ****************************************************/


router.get("/", userDataRoute.userGetRoute);



/*********************************************************
 * User Data Routes *
 * @deprecated Getting all filtered Data of users by role
 * *********************************************************/

router.get("/filter/role", userDataRoute.userRoleFilter);





module.exports = router;