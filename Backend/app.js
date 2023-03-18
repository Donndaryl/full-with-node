const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://donndaryl:diabie22NETWORK-@cluster0.j4n3bum.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width,Content,Accept,Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    next();
})

app.use(bodyParser.json());
app.use('/api/stuff', route);
app.use('/api/auth', userRoute);
module.exports = app; 