
/**
 *  DELETE (/shepherdanimal/delete/:shepherdanimalid)
 *  Kitoroli a meg adott pasztor - allatot.
 *  Ílyenkor a pasztortol is el kell tunnie a pasztor-allatnak.
 *  AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.shepherd_animal.remove(function (err, d) {
            if (err) {
                res.status(500).send("A torles nem sikerult");
            }
            res.json(d);
        });
    };
};
