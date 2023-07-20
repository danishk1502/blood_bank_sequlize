exports.responseData = (msg)=>{
    if(msg == "username already Exist"){
        return {message : msg, status:403}
    }

}
