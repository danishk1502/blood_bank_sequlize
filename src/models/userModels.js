const sequelizeDb = require('../config/dbConfig')
const DataTypes = require("sequelize");


const user = sequelizeDb.define("users_blood_bank", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    lname: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("user", "blood_bank", "superuser"),

    },
    state: {
        type: DataTypes.STRING,
 
    },
    distt: {
        type: DataTypes.STRING,

    },
    created_by: {
        type: DataTypes.STRING,
        
    },
    updated_by: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.ENUM("true", "false"),
        defaultValue: "true",
    },
    user_status: {
        type: DataTypes.ENUM("Active", "Deactivate"),
        defaultValue: "Active",
    },
    last_donation: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    able_to_donate: {
        type: DataTypes.DATE,
        defaultValue: null
    }
}, 
{
    paranoid: true
});




module.exports = user;

