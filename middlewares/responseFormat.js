module.exports = function(req,res,next){
  
  res.sendResponse = function(status = undefined, code = 500, message = "Internal Server Error", data = []){
    return res.json({
      "status": status,
      "code": code,
      "message": message,
      "data": data
    });
  }
  next()
}

    