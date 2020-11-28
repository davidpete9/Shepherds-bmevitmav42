/**
 * PUT (/shepherdanimal/update/:shepherdanimalid)
 * Meg fogja valtoztatni azt, hogy hany darabot birtokol a pasztor a mar meglevoen birtokolt allatbol.
 * AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (!!res.locals.shepherd_animal && !!req.body._id && req.body.quantity) {
            let toBeUpdated = res.locals.shepherd_animal;
            if (parseInt(req.body.quantity) < 0) {
                res.status(400).send("nem lehet negativ darabszam...");
                return;
            }
            toBeUpdated.quantity = req.body.quantity;
            toBeUpdated.save(
                function (err, doc) {
                    if (!!err) {
                        res.status(400).json({message: "Nem sikerült a modositas"});
                        return;
                    }
                    return res.json(doc);
                });
        }
    };
};
