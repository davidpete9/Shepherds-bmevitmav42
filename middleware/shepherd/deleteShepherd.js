
/**
 *
 * Ez egy DELETE methodosu request, kitorli az id-val megadott pasztort.
 * Mivel ez csak AJAX-osan lesz hiva, ezért JSON-nel fog visszaterni (a kitorolt pasztor adataival, ha sikerult)
 *
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.shepherd.remove(function (err, d) {
            if (err) {
                res.status(500).send("A torles nem sikerult");
            }
            res.json(d);
        })
    };
};
