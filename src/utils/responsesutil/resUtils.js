
exports.response = (res, data, message, statuscode) => {
    res.status(statuscode).json({
      status: statuscode,
      data,
      message,
    });
  };

