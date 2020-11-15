const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const photoService = require('./photo.service');

// routes
router.post('/uploadnew', registerSchema, register);
router.get('/allimages', authorize(), getAll);
router.get('/userimages/:username', authorize(), getUserPhotos);
router.get('/:id', authorize(), getById);
//router.put('/:id', authorize(), updateSchema, update);
router.delete('/deleteimage/:id', authorize(), _delete);

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

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         username: Joi.string().empty(''),
//         password: Joi.string().min(6).empty('')
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

function _delete(req, res, next) {
    photoService.delete(req.params.id)
        .then(() => res.json({ message: 'Photo deleted successfully' }))
        .catch(next);
}