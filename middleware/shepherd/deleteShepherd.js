
/**
 *
 * Ez egy DELETE methodosu request, kitorli az id-val megadott pasztort.
 * Mivel ez csak AJAX-osan lesz hiva, ezért JSON-nel fog visszaterni (a kitorolt pasztor adataival, ha sikerult)
 *
 */
const requireOption = require('../requireOption');
const fs = require('fs');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.shepherd.remove(function (err, d) {
            if (err) {
                res.status(500).send("A torles nem sikerult");
            }
            if (!!d.image_path) {
                fs.unlink('./public'+d.image_path, function() {
                     res.json(d);
                });
            }
            else {
                res.json(d);
            }
        })
    };
};
