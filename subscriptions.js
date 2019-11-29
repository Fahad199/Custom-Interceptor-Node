const myEmitter = require('./emitter');

myEmitter.on('user-registered', (context) => {
    console.log(context);
});
//myEmitter.on('user-loggedin', sendDataOnLogin);