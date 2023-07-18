const userController = require("../controllers/userController")



//*******************************************************************User Register route***************************************************************************************** */
exports.userRegisterRoute = userController.userRegister;


/*******************************************************************User Authentication route***************************************************************************************** */
exports.userAuthenticationRoute = userController.userAuthentication;


/*******************************************************************User Deletion route***************************************************************************************** */
exports.userDeletionRoute = userController.userDeletion;


/*******************************************************************User Get route***************************************************************************************** */
exports.userGetRoute = userController.userGet;