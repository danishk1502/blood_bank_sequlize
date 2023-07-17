const userController = require("../controllers/userController")



//*******************************************************************User Register route***************************************************************************************** */
exports.userRegisterRoute = userController.userRegister;


/*******************************************************************User Register route***************************************************************************************** */
exports.userAuthenticationRoute = userController.userAuthentication;


/*******************************************************************User Register route***************************************************************************************** */
exports.userDeletionRoute = userController.userDeletion;

/*******************************************************************User Get route***************************************************************************************** */
exports.userGetRoute = userController.userGet;