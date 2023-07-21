const sequelizeDb = require('../config/dbConfig')
const DataTypes = require("sequelize");


const userActions = sequelizeDb.define("user_actions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Action: {
        type: DataTypes.ENUM("Request", "Donation"),
    },
    blood_group: {
        type: DataTypes.STRING,
        defaultValue:0
    },
    number_of_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    created_by: {
        type: DataTypes.STRING,
        
    },
    updated_by: {
        type: DataTypes.STRING,
    }
}, 
{
    paranoid: true
});



 
module.exports = userActions;

