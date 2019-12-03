module.exports = function(req,res,next){
  
  res.sendResponse = function(status, message, data){
    res.status(status).json({
      status: data.hasOwnProperty('status')? "status" : undefined,
      message: data.hasOwnProperty('message')? "message" : "no message",
      error: data.hasOwnProperty('error')? "message" : undefined,
      data: req.body
    });
  }
  next()
}

    