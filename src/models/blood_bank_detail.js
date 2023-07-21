const sequelizeDb = require('../config/dbConfig')
const DataTypes = require("sequelize");


const blood_bank_details = sequelizeDb.define("blood_bank_details", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numberOfSales: {
        type: DataTypes.INTEGER,
    },
    totalDonation: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    is_deleted: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: "false",
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



 
module.exports = blood_bank_details;

