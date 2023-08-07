// const user =require("./users");

'use strict';
const {
  Model
} = require('sequelize');
// const { all } = require('../routes/router');
module.exports = (sequelize, DataTypes) => {
  class userAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(userAction, {
        foreignKey: 'usersBloodBankId'
      });
      userAction.belongsTo(models.Users);
    }
  }
  userAction.init({

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    action: {
      type: DataTypes.ENUM("Request", "Donation"),
    },
    rejected_by: {
      type: DataTypes.ENUM("user", "blood_bank"),
    },
    status: {
      type: DataTypes.ENUM("Accepted", "Reject"),
    },
    blood_group: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    donation: {
      type: DataTypes.ENUM("Done", "Incomplete"),
    },
    date: {
      type: DataTypes.DATEONLY
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
  }, {
    sequelize,
    modelName: 'userAction',
    paranoid: true
  });
  return userAction;
};