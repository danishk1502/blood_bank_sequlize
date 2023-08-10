const uuid = require("uuid");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bloodBankDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasOne(bloodBankDetails);
      bloodBankDetails.belongsTo(models.Users);
    }
  }
  bloodBankDetails.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      numberOfSales: {
        type: DataTypes.INTEGER,
      },
      totalDonation: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalBloodUnitAvailable: {
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
      modelName: "bloodBankDetails",
    }
  );
  return bloodBankDetails;
};
