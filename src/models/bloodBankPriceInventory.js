const uuid = require("uuid");
"use strict";
const { Model, AccessDeniedError } = require("sequelize");
const { all } = require("../routes/router");
module.exports = (sequelize, DataTypes) => {
  class bloodBankPriceInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasOne(bloodBankPriceInventory);
      bloodBankPriceInventory.belongsTo(models.Users);
    }
  }
  bloodBankPriceInventory.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      a_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      b_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      o_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ab_positive_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      a_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      b_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      o_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ab_negative_blood_unit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "bloodBankPriceInventory",
      paranoid: true,
    }
  );
  return bloodBankPriceInventory;
};
