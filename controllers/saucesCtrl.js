const Sauces = ('../models/modelsSauces');

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
    delete req.body._id;
    const newSauce = new Sauces({
        ...req.body,
        usersLiked: [],
        usersDisliked: []
        
    });
    newSauce.save()
        .then(() => res.status(201).json({message: "Sauce enregistrée dans la base de données"}))
        .catch(error => res.status(400).json({error}));
};

exports.modifySauces = (req, res, next) => {
    Sauces.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: "Modification de la sauce prise en compte"}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauces = (req, res, next) => {
    Sauces.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Sauces supprimée de la base de données"}))
        .catch(error => res.status(400).json({error}));
};

exports.sendLikeDislike = (req, res, next) => {
    let arrayOfLike = [];
    let arrayOfDislike = [];
    let sauceToLike;

    Sauces.findOne({_id: req.params.id})
    .then(sauce => 
       /* sauceToLike = sauce */
        res.status(200).json(sauce)
    )
    .catch(error => res.status(404).json({error}));

    if (req.body.like = 1)
    {

    }
    else if (req.body.like = 0)
    {

    }
    else if (req.body.like = -1)
    {

    }
    
    Sauces.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: "Mention like dislike prise en compte"}))
        .catch(error => res.status(400).json({error}));
};