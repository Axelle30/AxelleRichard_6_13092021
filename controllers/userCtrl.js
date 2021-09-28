
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const newUser = new User({
            email: req.body.email,
            password: hash
        });
        newUser.save()
            .then(() => res.status(201).json({message: 'Utilisateur crée'}))
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(502).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(404).json({error: "utilisateur non trouvé !"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({error: "Mot de passe incorrect"});  
            }
            console.log(user._id);
            const token = jwt.sign(
                {userId: user._id},
                '6H5m1e5x9CJyJ0t9hmzkICvmu6NrzscVVjPMRrrdz6k3uKuh',
                {expiresIn: "6h"}
            );
            resObject = {
                userId: user._id,
                token: token
                
            };
            res.status(202).json(resObject);
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};