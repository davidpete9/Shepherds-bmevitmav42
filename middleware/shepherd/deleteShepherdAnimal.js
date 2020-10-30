
/**
 *  DELETE (/shepherd/:shepherdid/animals/delete/:animalid)
 *  Kitoroli a megadott allatot a pasztortol.
 *  AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
