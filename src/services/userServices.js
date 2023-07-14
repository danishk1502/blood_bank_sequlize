const sequelizeModel = require('../models/userModels')


const userServiceData = async(req,res)=>{
    sequelizeModel.sync().then(() => {
        sequelizeModel.findOne({
            where: {
                username: req.body.username
            }
        }).then(result => {
           if(result==null){
            sequelizeModel.create(req.body).then((results) => {
                console.log(results);
                res.send("user Created")
             }).catch((error) => {
                 console.error('Failed to create a new record : ', error);
             });
           }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });
    
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
                 }


 module.exports = userServiceData;



