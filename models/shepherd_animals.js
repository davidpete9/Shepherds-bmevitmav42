const Schema = require('mongoose').Schema;
const db = require('../config/db');

const shepherd_animal = db.model('ShepherdAnimal', {
    quantity: Number,
    shepherd: {
        type: Schema.Types.ObjectId,
        ref: 'Shepherd'
    },
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
    }

});

module.exports = shepherd_animal;
