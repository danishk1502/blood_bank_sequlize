const sequelizeDb = require('../config/dbConfig')
const DataTypes = require("sequelize");


const bloodBankInventory = sequelizeDb.define("blood_banks_inventory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    a_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    b_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    o_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    ab_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    a_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    b_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    o_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    ab_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue:0
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


 
module.exports = bloodBankInventory;

