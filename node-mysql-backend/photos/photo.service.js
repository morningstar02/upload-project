const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getUserPhotos,
    getById,
    create,
    delete: _delete
};


async function getAll() {
    return await db.Photo.findAll();
}

async function getUserPhotos(username) {
    return await getPhotosOfUser(username);
}

async function getById(id) {
    return await getPhoto(id);
}

async function create(params) {

    // save user
    await db.Photo.create(params);
}


async function _delete(id) {
    const photo = await getPhoto(id);
    await photo.destroy();
}

// helper functions

async function getPhoto(id) {
    const photo = await db.Photo.findByPk(id);
    if (!photo) throw 'Photo not found';
    return photo;
}

async function getPhotosOfUser(username) {
    const photo = await db.Photo.findAll({
        where: {
          username
        }
      });
    if (!photo) throw 'Photo not found';
    return photo;
}
