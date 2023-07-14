const router = require('express').Router();
const userRoute = require("./userRoute")
const usermiddelware = require("../middelware/userMiddelware")



//*****************************************************User Routes ***********************************8 */
router.post("/register", usermiddelware, userRoute.userRegisterRoute);


module.exports = router;