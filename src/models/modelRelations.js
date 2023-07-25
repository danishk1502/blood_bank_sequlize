


/**********************************************************
 * Relation Betweet user Table and blood bank detail table
/**********************************************************/


exports.bloodBankDetailRelation=(bloodBankDetails, userModel)=>{
    userModel.hasOne(bloodBankDetails, {
        foreignKey: 
            'userId'
        
      });
      bloodBankDetails.belongsTo(userModel);
    
}


exports.bloodBankInventoryRelation=(bloodBankInventory, userModel)=>{
    userModel.hasOne(bloodBankInventory, {
        foreignKey: 
            'userId'
      });
      bloodBankInventory.belongsTo(userModel);
    
}



exports.userActionRelation=(userAction, userModel)=>{
    userModel.hasOne(userAction, {
        foreignKey: 
            'userId'
      });
      userAction.belongsTo(userModel);
    
}


exports.priceBloodInventoryRelation=(priceInventory, userModel)=>{
    userModel.hasOne(priceInventory, {
        foreignKey: 
            'userId'
      });
      priceInventory.belongsTo(userModel);
}