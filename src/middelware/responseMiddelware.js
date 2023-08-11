
const resMiddelware = (res, statusCode, statusMsg, data)=>{
    return res
    .status(statusCode)
    .json({ status: statusCode, message: statusMsg, data:data });
}

module.exports = {resMiddelware}