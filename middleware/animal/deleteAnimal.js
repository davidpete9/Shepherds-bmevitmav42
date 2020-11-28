
/**
 * DELETE
 * torli a megadott allatjajt.
 * Mivel csak AJAX-osan lesz hivva, ezert JSON-nel ter vissza.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.animal.remove(function (err, d) {
            if (err) {
                res.status(500).send("A torles nem sikerult");
            }
            res.json(d);
        })
    };
};
