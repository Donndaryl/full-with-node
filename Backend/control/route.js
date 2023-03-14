const Thing = require("../models/thing");

exports.CreateThing = (req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    })
    thing.save()
        .then(()=>{
            res.status(201).json({message: 'Objet enregistré !!'})
        })
        .catch((error)=>{res.status(401).json({message: error})})
}
exports.UpdateThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.GetAllThing = (req,res,next)=>{
    Thing.find()
        .then(thing => res.status(200).json(thing))
        .catch( error => res.status(400).json({error}))
}

exports.GetOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

exports.DeleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}