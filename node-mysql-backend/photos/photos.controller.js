const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const photoService = require('./photo.service');
const upload = require('../_helpers/multer.config');
const db = require('_helpers/db');
// routes
// router.post('/uploadnew', registerSchema, register);
router.get('/allimages', authorize(), getAll);
router.get('/userimages/:username', authorize(), getUserPhotos);
router.get('/:id', authorize(), getById);
//router.put('/:id', authorize(), updateSchema, update);
router.delete('/deleteimage/:id', authorize(), _delete);
router.post('/upload', upload.single("file"), uploadFile);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        photoName: Joi.string().required(),
        username: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    photoService.create(req.body)
        .then(() => res.json({ message: 'Photo saved successful' }))
        .catch(next);
}

function uploadFile(req, res, next) {
    const formData = req.body;
    const thisFile = req.file;
    console.log('$$$$%%%%, ', thisFile)
  console.log('$###### form data', formData);
    db.Photo.create({
        photoName: formData.filename,
        username: formData.username,
        data: thisFile.buffer
      }).then(() => {
        res.json({msg:'File uploaded successfully! -> filename = ' + formData.filename });
      })
        .catch(next);
}

function getAll(req, res, next) {
    photoService.getAll()
        .then(photos => res.json(photos))
        .catch(next);
}

function getUserPhotos(req, res, next) {
    console.log('####')
    photoService.getUserPhotos(req.params.username)
        .then(photos => res.json(photos))
        .catch(next);
}

function getById(req, res, next) {
    console.log('^^^6666')
    photoService.getById(req.params.id)
        .then(photo => res.json(photo))
        .catch(next);
}

function _delete(req, res, next) {
    photoService.delete(req.params.id)
        .then(() => res.json({ message: 'Photo deleted successfully' }))
        .catch(next);
}