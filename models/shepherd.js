const Schema = require('mongoose').Schema;
const db = require('../config/db');

const shepherd = db.model('Shepherd', {
    name: String,
    area: String,
    address: String,
    born: Date,
    image_path: String,
    animals: [{type: Schema.Types.ObjectId, ref: 'ShepherdAnimal'}]
});

module.exports = shepherd;
