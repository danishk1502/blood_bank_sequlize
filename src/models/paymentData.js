"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class paymentDataModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.userAction.hasMany(paymentDataModel, {
        // foreignKey: 'UserId'
      });
      paymentDataModel.belongsTo(models.userAction);

      models.Users.hasMany(paymentDataModel, {
        foreignKey: "UserId",
      });
      paymentDataModel.belongsTo(models.Users);
    }
  }
  paymentDataModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      payment: {
        type: DataTypes.ENUM("Incomplete", "Complete", "Pending"),
      },
      transaction_id: {
        type: DataTypes.STRING,
        defaultValue: null,
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
      modelName: "paymentDataModel",
      paranoid: true,
    }
  );
  return paymentDataModel;
};
