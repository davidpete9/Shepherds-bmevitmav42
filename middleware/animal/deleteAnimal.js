
/**
 * DELETE
 * torli a megadott allatjajt.
 * Mivel csak AJAX-osan lesz hivva, ezert JSON-nel ter vissza.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
