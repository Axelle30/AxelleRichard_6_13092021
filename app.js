const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://AxelleHotTakeUser:AxelleHotTakesP6Password@axellehottakesp6.kjkfb.mongodb.net/AxelleHotTakesP6?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connexion à la base de données réussie"))
.catch((error) => console.log(error));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());

app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;