
/**
 * POST (/shepherd/:shepherdid/animals/new)
 * Egy pasztorhoz fog tudni hozzadrendelni egy allatot, es azt, hogy hanyat birtokol belole. A modositast itt masik MV fogja kezelni (updateShepherdAnimal)
 *  AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
