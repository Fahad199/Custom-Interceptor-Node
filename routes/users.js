const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const EventEmitter = require('events');
const middlewares = require('../middlewares/responseFormat');
const myEmitter = new EventEmitter();


router.post('/', async(req, res) => {
    const { error, success } = validate(req.body);
    if (error) {
        //return res.json(error.details[0].message);
        console.log(error.detail[0].message);
        return res.sendResponse(500, error.details[0].message, req.body);
    }
    if(success){
        console.log(success);
        return res.sendResponse(200, success.details[0].Object, req.body);
    }
    register(req, res);
});

const register = async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(user);
        await myEmitter.emit('user-registered', user.save());
        res.send(user);
    }
}


module.exports = router;