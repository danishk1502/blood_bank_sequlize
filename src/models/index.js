"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./users")(sequelize, DataTypes);
db.userAction = require("./userAction")(sequelize, DataTypes);
db.userPayments = require("./paymentData")(sequelize, DataTypes);
db.bloodBankInventory = require("./bloodInventory")(sequelize, DataTypes);
db.bloodBankDetail = require("./bloodBankDetails")(sequelize, DataTypes);
db.priceBloodInventory = require("./bloodBankPriceInventory")(
  sequelize,
  DataTypes
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Sync function

db.sequelize
  .sync()
  .then(() => {
    console.log("Table created Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
