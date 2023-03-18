const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.signUp = (req,res,next)=>{

    bcrypt.hash(req.body.password,10).
        then(hash =>{

            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(()=>
                res.status(201).json({message: 'Utilisateur créé !'})
            )
                .catch(error =>
                res.status(400).json({error})
            )
    }).
        catch()
}
exports.logIn = (req,res,next)=>{
    User.findOne(
        {email: req.body.email}
    ).then(
        data =>{
            if(!data){
                return res.status(401).json({
                    message: "Paire login/mot de passe incorrect !"
                })
            }else{
                bcrypt.compare(req.body.password,data.password).then(
                    isValid =>{
                        if (isValid){
                            res.status(200).json({userId: data._id,token: jwt.sign(
                                    {userId: data._id},
                                    'RANDOM_TOKEN_SECRET',
                                    {expiresIn: '12h'}
                                )})
                        }else{
                            res.status(401).json({message: "Paire login/mot de passe incorrect !"})
                        }
                    }
                ).catch(
                error =>(res.status().json({error}))
                )
            }
        }
    ).catch(
        error =>{res.status().json({error})}
    )
}