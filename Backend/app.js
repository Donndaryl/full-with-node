const express = require('express');
const {json} = require("express");
const app = express();
app.use(express.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width,Content,Accept,Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH,OPTIONS');
    next();
})
app.post('/api/stuff',(req,res,next)=>{
    console.log(req.body);
    res.status(200).json({
        message: 'vos données ont été enregistré !!'
    });
})
app.get('/api/stuff',(req,res)=>{
    const stuff = [
        {
         _id: '1',
            title: 'the most popular framexork',
            description: 'Make code thing with few code',
            imageUrl: '',
            price: 2000,
            userId: 11
        },
        {
            _id: 2,
            title: 'second popular framexork',
            description: 'Lets make it real !!',
            imageUrl: '',
            price: 2000,
            userId: 22
        }
    ]
    res.status(200).json(stuff)
})
module.exports = app;