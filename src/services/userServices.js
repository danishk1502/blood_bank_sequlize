const sequelizeModel = require('../models/userModels')
// const userData = require('../utils/userData')
const md5 = require("md5");
const userStatus = "Active";








const userRegistrationData = async (req, res) => {
    if (req.body.role == "blood_bank") {
        userStatus = "Deactivate";
    }

    const userInfo = {
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        username: req.body.username,
        state: req.body.state,
        distt: req.body.distt,
        is_deleted: "false",
        created_by: req.body.username,
        updated_by: req.body.username,
        is_active: "true",
        user_status: userStatus
    }

    sequelizeModel.sync().then(() => {
        sequelizeModel.findOne({
            where: {
                username: req.body.username
            }
        }).then(result => {
            if (result == null) {
                sequelizeModel.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then(resultEmail => {
                    if (resultEmail == null) {
                        sequelizeModel.create(
                            userInfo

                        ).then((results) => {
                            console.log(results);
                            res.send("user Created")
                        }).catch((error) => {
                            console.error('Failed to create a new record : ', error);
                        });

                    }
                    else {
                        res.send("user already exist on this email");
                    }
                }).catch((error) => {
                    console.error('Failed to retrieve data : ', error);
                });
            }
            else {
                res.send("user already exist");
            }

        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });


    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}





module.exports = {userRegistrationData};  