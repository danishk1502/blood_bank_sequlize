const sequelizeDb = require('../config/dbConfig')
const DataTypes = require("sequelize");


const userPaymentDetails = sequelizeDb.define("payment_detail_table", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total_amount: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    payment: {
        type: DataTypes.ENUM("Incomplete", "Complete", "Pending")
    },
    transaction_id: {
        type: DataTypes.STRING,
        defaultValue:null
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


 
module.exports = userPaymentDetails;

