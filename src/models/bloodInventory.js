"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bloodInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasOne(bloodInventory);
      bloodInventory.belongsTo(models.Users);
    }
  }
  bloodInventory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      modelName: "bloodInventory",
      paranoid: true,
    }
  );
  return bloodInventory;
};
