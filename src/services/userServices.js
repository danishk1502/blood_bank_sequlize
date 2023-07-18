const sequelizeModel = require('../models/userModels')




/***********************************************************************************
 * @description Common function for validations 
 * *********************************************************************************/


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
                    username: username
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
                email: email
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
        throw Error('Error while Paginating Users')
    }
};


        //********************************************soft Delete Here***************************************************** */

        const userDeletionData = (req, res) => {
            sequelizeModel.sync().then(() => {
                sequelizeModel.findOne({
                    where: {
                        username: req.body.username
                    }
                }).then(result => {
                    if (result == null) {
                        res.send("username doesn't exists");
                    }
                    else if (result.user_status == "Deactivate") {
                        res.send("you bank's registration application is under progress you doesn't delete your blood bank");

                    }
                    else {
                        if (result.password == md5(req.body.password)) {
                            sequelizeModel.destroy({
                                where: {
                                    username: req.body.username
                                }
                            }).then(() => { res.send("Account is Deleted"); })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                        else {
                            res.send("Wrong Credentials");
                        }
                    }
                })
                    .catch(err => {
                        res.send(err)
                    })
            })
        }



        //Get api

        const userGetData = (req, res) => {
            sequelizeModel.sync().then(() => {
                sequelizeModel.findAll({}).then((result) => {
                    res.send(result);
                })
                    .catch((err) => {
                        console.log(err);
                    })
            })

        }

        module.exports = { userRegistrationData, findEmail, userAuthenticationData, userDeletionData, userGetData, findUsername };  