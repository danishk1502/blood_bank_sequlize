//user status ENUM
exports.USERSTATUS = {
  ACTIVE: "Active",
  DEACTIVE: "Deactivate",
};


//User Role ENUM
exports.USER_ROLE = {
  USER: "user",
  BLOOD_BANK: "blood_bank",
  SUPERUSER: "superuser",
};


//users Request status ENUM 

exports.REQUESTSTATUS = {
    ACCEPT : "Accepted",
    DECLINE : "Reject",
    
}

exports.REQUEST = {
  ACCEPT : "Accept",
  DECLINE : "Decline",
}



//users Request Type ENUM

exports.USERREQUESTTYPE = {
    DONATION : "Donation",
    REQUEST : "Request"
}


//Donation status 

exports.DONATION_TYPE = {
    DONE : "Done",
    INCOMPLETE : "Incomplete"
}


//Payment status 

exports.PAYMENT_STATUS = {
  COMPLETE :"Complete",
  INCOMPLETE : "Incomplete",
  PENDING : "Pending"
}


//Active Status 

exports.ACTIVE = {
  TRUE:"true",
  FALSE:"false"
}

//Undefined 

exports.UNDEFINED = {
 NOT_DEFINE : "undefined"
}