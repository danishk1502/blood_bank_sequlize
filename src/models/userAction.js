const sequelizeDb = require('../config/dbConfig')
const DataTypes = require("sequelize");


const userActions = sequelizeDb.define("user_actions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    action: {
        type: DataTypes.ENUM("Request", "Donation"),
    },
    rejected_by:{
        type: DataTypes.ENUM("user", "blood_bank"),
    },
    status: {
        type: DataTypes.ENUM("Accepted", "Reject"),
    },
    blood_group: {
        type: DataTypes.STRING,
        defaultValue:null
    },
    number_of_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: null
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

