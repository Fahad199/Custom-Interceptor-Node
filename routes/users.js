const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

router.post('/', async(req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        //return res.status(400).send(error.details[0].message);
        return res.send(500,"name is not correct",req.body);
    }
    register(req, res);
    //await myEmitter.on('user-registered', register(req,res));
});

// Check if this user already exisits
const register = async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(user);
        await myEmitter.emit('user-registered', user.save());
        //await user.save();
        res.send(user);
    }
}


module.exports = router;