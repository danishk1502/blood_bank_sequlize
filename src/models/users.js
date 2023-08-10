const uuid = require("uuid");
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
      },
      lname: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
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
        defaultValue: null,
      },
      able_to_donate: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      paranoid: true,
    }
  );
  return Users;
};
