const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://AxelleHotTakeUser:KVV0VZsT9q6jEc4H@elvorfilia.ygbhc.mongodb.net/Elvorfilia?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connexion à la base de données réussie"))
.catch(() => console.log("Echec de connexion à la base de données"));

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;