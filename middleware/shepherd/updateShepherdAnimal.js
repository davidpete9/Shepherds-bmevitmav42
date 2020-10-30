
/**
 * PUT (/shepherd/:shepherdid/animals/update/:animalid)
 * Meg fogja valtoztatni azt, hogy hany darabot birtokol a pasztor a mar meglevoen birtokolt allatbol.
 * AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
