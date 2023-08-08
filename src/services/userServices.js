
const userModel = require('../models/index');

const sequelizeModel = userModel.user;




/***********************************************************************************
 * @description Common function for validations 
 * *********************************************************************************/
const findUser = async (attribute) => {
    try {
        const users = await  sequelizeModel.findOne({
            where : attribute
        })
        return users;
    } catch (e) {
        throw Error("Error while finding Data")
        
    }
};






/*******************************************************************
 * findId
 * @param {*} username 
 * @returns : return data if id exist or not
 * @description : This function check about id in database
 * (This function also used in login)
*******************************************************************/

const findId = async (uniqueID) => {
    try {
        const users = await  sequelizeModel.findOne({
            where: {
                id: uniqueID
            }
        })
        return users;
    } catch (e) {
        throw Error("Error while finding Data")
        
    }
};



/*******************************************************************
 * findUsername
 * @param {*} username 
 * @returns : return data if username exist or not
 * @description : This function check about username in database
 * (This function also used in login)
*******************************************************************/

const findUsername = async (username) => {
        try {
            const users = await  sequelizeModel.findOne({
                where: {
                    username : username
                }
            })
            return users;
        } catch (e) {
            throw Error('Error while Paginating Users')
        }
};

/*******************************************************
 * findEmail
 * @param {*} email 
 * @returns return data if email exists
 * @description check about email address exist or not 
 *******************************************************/

const findEmail = async (email) => {
    try {
        const users = await  sequelizeModel.findOne({
            where: {
                email
            }
        })
        return users;
    } catch (e) {
        throw Error('Error while Paginating Users')
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




/***********************************************************************************
 * @description Getter function (using role filter)
 * *********************************************************************************/



/*******************************************************************
 * get all Data of a specific role
 * @param {*}  role
 * @returns : get all Data of a specific role
 * @description : This function used to get all Data of a specific role
*******************************************************************/

const userRoleFilter = async (role) => {
    try {
        const users = await sequelizeModel.findAll({
            where : {
                role : role,
                user_status:"Active"
            }
        })
        return users;
    } catch (e) {
        console.log("error occur" + e);
    }
};



/*******************************************************************
 * get Data of blood banks whose request for registration are not completed
 * @param {*}  role user_status
 * @returns : get all Data of a specific role
 * @description : This function used to get all Data of a specific role
*******************************************************************/

const bloodBankPending = async (role) => {
    try {
        const users = await sequelizeModel.findAll({
            where : {
                role : role,
                user_status : "Deactivate"
            }
        })
        return users;
    } catch (e) {
        console.log("error occur" + e);
    }
};

       

module.exports = { userRegistrationData,findUser, findEmail, userDeletion, findUsername, userAuthentication, findId, userRoleFilter, userUpdation, bloodBankPending };  