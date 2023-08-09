
const userModel = require('../models/index');
const sequelizeModel = userModel.user;




/***********************************************************************************
 * @description Common function for validations 
 * *********************************************************************************/
const findUser = async (attribute) => {
    try {
        const users = await  sequelizeModel.findAll({
            where : attribute
        })
        return users;
    } catch (e) {
        throw Error("Error while finding Data")
        
    }
};



/***********************************************************************************
 * @description User, Blood-bank and Superuser CRUD functions 
 * *********************************************************************************/



/*******************************************************************
 * userRegistrationData
 * @param {*} userData 
 * @returns : return data after user Creation 
 * @description : This function Create user
*******************************************************************/


const userRegistrationData = async (userData) => {
    try {
        const userCreate = await  sequelizeModel.create(
            userData
            )
        return userCreate;
    } catch (e) {
        console.log("error occur" + e);
    }
};



/*******************************************************************
 * userAuthentication
 * @param {*} is_active 
 * @returns : Change is_Active to true while login
 * @description : This function used to login
*******************************************************************/

const userAuthentication = async (username) => {
    try {
        const userLogin = await sequelizeModel.update(
            { is_active: 'true' },
            { where: { username: username }}
            )
        return userLogin;
    } catch (e) {
        console.log("error occur" + e);
    }
};


/*******************************************************************
 * userDeletion
 * @param {*} username 
 * @returns : Used for soft delete
 * @description : This function used to delete a user
*******************************************************************/

const userDeletion = async (username) => {
    try {
        const userDelete = await sequelizeModel.destroy({
            where: {
                username: username
            }
        })
        return userDelete;
    } catch (e) {
        console.log("error occur" + e);
    }
};

/*******************************************************************
 * userUpdation
 * @param {*} username 
 * @returns : Used for Data update
 * @description : This function used to update a user
*******************************************************************/

const userUpdation = async (updateData, id) => {
    try {
        const userUpdate = await sequelizeModel.update(
            updateData,
            
            {
            where: {
                id: id
            }
        })
        return userUpdate;
    } catch (e) {
        console.log("error occur" + e);
    }
};


       

module.exports = { userRegistrationData,findUser, userDeletion, userAuthentication, userUpdation };  