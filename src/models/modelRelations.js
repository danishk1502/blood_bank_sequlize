


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