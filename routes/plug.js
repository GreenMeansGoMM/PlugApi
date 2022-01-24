const express = require('express');
const multer = require('multer');

const Plug = require('../models/plug');
const upload = multer();

const router = express.Router();

const plugController = require('../controllers/plug');

router.get('/plug', plugController.getAllPosts);
router.post('/plug', upload.none(), plugController.newPost);
router.delete('/plug', plugController.deleteAllPosts);

router.get('/plug/:name', plugController.getOnePost);
router.post('/plug/:name', plugController.newReview);
router.delete('/plug/:name', plugController.deleteOnePost);
router.post('/users', plugController.newUser);
router.post('/:id/quantity', upload.none(), plugController.updateQuanity);
router.post('/:id/order', upload.none(), plugController.newOrder);

router.post('/login', plugController.logIn);

setPassword = function(password){

    this.salt = crypto.randomBytes(16).toString(`hex`);

    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};
updateQuanity = function(quantity){
    let Plug = new Plug();
    return res.json(Plug.findByIdAndUpdate({id : id}, {$inc: {'Plug.quantity' : quantity}}));


};

module.exports = router;
