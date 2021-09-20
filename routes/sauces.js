const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/saucesCtrl');
const auth = require('../middleware/auth');
 
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getSaucesById);
router.post('/', auth, saucesCtrl.createSauces);
router.put('/:id', auth, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.post('/:id/like', auth, saucesCtrl.sendLikeDislike);



module.exports = router;