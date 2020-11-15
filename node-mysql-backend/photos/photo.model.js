const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        photoName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            
        },
        scopes: {
            
        }
    };

    return sequelize.define('Photo', attributes, options);
}