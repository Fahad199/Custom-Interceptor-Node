"use-strict"

const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async(req, res) => {
    const { error, success } = validate(req.body);
    if (error) {
        return res.sendResponse("failure", 400, "Name incorrect", req.body);
    }
    else{
        console.log(success);
        return res.sendResponse("success", 200, "User Registered Successfully", req.body);
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
        await user.save();
        res.send(user);
    }
}


module.exports = router;