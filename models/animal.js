const Schema = require('mongoose').Schema;
const db = require('../config/db');

const animal = db.model('Animal', {
    name: String,
    cost: Number
});

module.exports = animal;
