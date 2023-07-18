const router = require('express').Router();
const userRoute = require("./userRoute")
const userDataRoute = require("./userDataRoute")
const usermiddelware = require("../middelware/userMiddelware")


// *****************************************Users Routes*****************************************************/ 


//*****************************************************User Routes Registration*********************************** */
router.post("/register", usermiddelware, userRoute.userRegisterRoute);

// /*****************************************************User Routes ***********************************8 */
router.patch("/login", userRoute.userAuthenticationRoute);

// /*****************************************************User Routes ***********************************8 */
router.delete("/delete", userRoute.userDeletionRoute);








// *****************************************Users Data Routes*****************************************************/ 


router.get("/", userDataRoute.userGetRoute);

// *****************************************Users Data filter Routes by role*****************************************************/ 

router.get("/filter/role", userDataRoute.userRoleFilter);





module.exports = router;