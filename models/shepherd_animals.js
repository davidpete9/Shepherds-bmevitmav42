const Schema = require('mongoose').Schema;
const db = require('../config/db');

const shepherd_animal = db.model('ShepherdAnimal', {
    quantity: Number,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'Shepherd'
    },
    _kind: {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
    }

});

module.exports = shepherd_animal;
