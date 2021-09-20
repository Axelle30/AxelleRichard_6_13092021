const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/saucesCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getSaucesById);
router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.post('/:id/like', auth, saucesCtrl.sendLikeDislike);



module.exports = router;