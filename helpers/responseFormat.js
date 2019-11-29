const responseFormat = (req, res, next) => {
    let oldResponse = res.send;
    
    res.send = function(status, message, data){
        res.status(status).json({status,message, data});
    // oldResponse.apply(res, arguments)
    }
    next();
}

module.exports = { responseFormat }
