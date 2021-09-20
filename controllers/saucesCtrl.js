const Sauces = require('../models/Sauces');
const fs = require("fs");


exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
};

exports.getSaucesById = (req, res, next) => {
    Sauces.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
};

exports.createSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete req.body._id;
    const newSauce = new Sauces({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
        usersLiked: [],
        likes: 0,
        dislikes: 0,
        usersDisliked: [],

        
    });
    newSauce.save()
        .then(() => res.status(201).json({message: "Sauce enregistrée dans la base de données"}))
        .catch(error => res.status(400).json({error}));
};

exports.modifySauces = (req, res, next) => {
    const updatedSauce = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    } : {...req.body};
    Sauces.updateOne({_id: req.params.id}, {...updatedSauce, _id: req.params.id})
        .then(() => res.status(200).json({message: "Modification de la sauce prise en compte"}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({_id: req.params.id})
        .then(saucesToDelete =>{
            const filename = saucesToDelete.imageUrl.split('/image/')[1];
            fs.unlink(`images/${filename}`, () =>{
                Sauces.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Sauces supprimée de la base de données"}))
                    .catch(error => res.status(401).json({error}));
            });
        })
        .catch(error => res.status(400).json({error}));
    
};

exports.sendLikeDislike = (req, res, next) => {
    let userId = req.body.userId;
    let like = req.body.like;
    let sauceId = req.params.id;

    Sauces.findOne({_id: req.params.id})
        .then(sauceToLike => {
            let likeCount = sauceToLike.like;
            let dislikeCount = sauceToLike.disLike;
            let likeArray = sauceToLike.usersLiked;
            let dislikeArray = sauceToLike.usersDisliked;
            if (like == 1){
                    likeCount++;
                    likeArray.push(userId)
                    console.log(dislikeArray);
                    console.log(sauceToLike.usersDisliked);
                    console.log(likeArray);
                    Sauces.updateOne({_id: sauceId}, {like: likeCount, usersLiked: likeArray})
                        .then(() => res.status(200).json({mesage: "Vous likez cette sauce"}))
                        .catch(error => res.status(400).json({error}));
            }
            else if (like == 0){
                if (sauceToLike.usersLiked.includes(userId) == true) {
                    likeCount--;
                    let cleanLikeArray = likeArray.filter(function(value){
                        return value !=userId
                    })
                    
                    Sauces.updateOne({_id: sauceId}, {like: likeCount, usersLiked: cleanLikeArray})
                        .then(() => res.status(200).json({mesage: "Vous ne likez plus cette sauce"}))
                        .catch(error => res.status(400).json({error}));
                }
                else if (dislikeArray.includes(userId) == true) {
                    dislikeCount--;
                    let cleanDislikeArray = dislikeArray.filter(function(value){
                        return value !=userId
                    })
                Sauces.updateOne({_id: sauceId}, {dislike: dislikeCount, usersDisliked: cleanDislikeArray})
                        .then(() => res.status(200).json({mesage: "Vous ne dislikez plus cette sauce"}))
                        .catch(error => res.status(400).json({error}));
                }
            }
            else if (like == -1){
                    dislikeCount++;
                    dislikeArray.push(userId);
                    console.log(dislikeArray, "PC4");
                    Sauces.updateOne({_id: sauceId}, {disLike: dislikeCount, usersDisliked : dislikeArray})
                    .then(() => res.status(200).json({mesage: "Vous dislikez cette sauce"}))
                    .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(500).json({error}));
};