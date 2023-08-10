// const { Model } = require('sequelize');
const userModel = require("../models/index");

/*****************************************
blood bank's inventory find using banks id
********************************************/

const bloodInventorySearch = async (bankId) => {
  try {
    const bloodBankDetails = await userModel.bloodBankInventory.findOne({
      where: {
        UserId: bankId,
      },
    });
    return bloodBankDetails;
  } catch (e) {
    console.log("error occur" + e);
  }
};

/*****************************************
Inventory changes while request acception  
********************************************/

const bloodInventoryChange = async (bankId, data) => {
  try {
    const bloodBankDetails = await userModel.bloodBankInventory.update(data, {
      where: {
        UserId: bankId,
      },
    });
    return bloodBankDetails;
  } catch (e) {
    console.log("error occur" + e);
  }
};

/*****************************************
price Inventory changes while request acception  
********************************************/

const priceInventoryChange = async (bankId, data) => {
  try {
    const bloodBankDetails = await userModel.bloodBankInventory.update(data, {
      where: {
        UserId: bankId,
      },
    });
    return bloodBankDetails;
  } catch (e) {
    console.log("error occur" + e);
  }
};

module.exports = {
  bloodInventorySearch,
  bloodInventoryChange,
  priceInventoryChange,
};
