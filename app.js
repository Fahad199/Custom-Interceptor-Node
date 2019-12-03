const mongoose = require('mongoose');
// const users = require('./routes/users');
const express = require('express');
const app = express();
const router = require('./routes/users');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(middlewares.responseFormat);
app.use(middlewares.errorHandler);

mongoose.connect("MONGO_DB", { //contains mongodb path
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));