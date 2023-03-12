const express = require('express');
//const {json} = require("express");
const bodyParser = require('body-Parser')
const app = express();
const Thing = require('./models/thing.js')
const mongoose = require('mongoose')
app.use(express.json())

mongoose.connect('mongodb+srv://***:***@cluster0.j4n3bum.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width,Content,Accept,Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH,OPTIONS');
    next();
})

app.use(bodyParser.json());

app.post('/api/stuff',(req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({
    ...req.body
    })
    thing.save()
        .then(()=>{
            res.status(201).json({message: 'Objet enregistré !!'})
        })
        .catch((error)=>{res.status(401).json({message: error})})
})
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
});
app.get('/api/stuff',(req,res,next)=>{
    Thing.find()
        .then(thing => res.status(200).json(thing))
        .catch( error => res.status(400).json({error}))
})
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;