const mongoose = require('mongoose');

const SaucesSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: String, required: true},
    likes: {type: String, required: true},
    dislikes: {type: String, required: true},
    usersLiked: {type: Array, required: true},
    userDisliked: {type: Array, required: true},
});

module.exports = mongoose.model('Sauce', SaucesSchema);