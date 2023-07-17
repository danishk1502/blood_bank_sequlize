const router = require('express').Router();
const userRoute = require("./userRoute")
const usermiddelware = require("../middelware/userMiddelware")


// *****************************************Users Routes*****************************************************/ 
//*****************************************************User Routes Registration*********************************** */
router.post("/register", usermiddelware, userRoute.userRegisterRoute);

// /*****************************************************User Routes ***********************************8 */
router.patch("/login", userRoute.userAuthenticationRoute);

// /*****************************************************User Routes ***********************************8 */
router.delete("/delete", userRoute.userDeletionRoute);

//get api

router.get("/", userRoute.userGetRoute)




module.exports = router;