const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 1)
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
            return res.status(401).json({error: "utilisateur non trouvé !"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({error: "Mot de passe incorrect"});  
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    '6H5m1e5x9CJyJ0t9hmzkICvmu6NrzscVVjPMRrrdz6k3uKuhTPXpFBDucTAYd2f1H0BAQReWD7kXELbBIQklsUrgH7iewScUqn64',
                    {exprireIn: "1h"}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};