/**
 * POST (/shepherd/:shepherdid/animals/new)
 * Egy pasztorhoz fog tudni hozzadrendelni egy allatot, es azt, hogy hanyat birtokol belole. A modositast itt masik MV fogja kezelni (updateShepherdAnimal)
 *  AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

const hasEntityInObj = require('../hasEntityInObj');

module.exports = function (objectrepository) {
    const shepherdAnimal = requireOption(objectrepository, 'shepherdAnimalModel');

    return function (req, res, next) {
        if (hasEntityInObj(req.body, 'shepherd_animal') && !!res.locals.shepherd) {

            if (parseInt(req.body.quantity) < 0) {
                res.status(400).send("nem lehet negativ darabszam...");
                return;
            }

            let toS = new shepherdAnimal({quantity: req.body.quantity, animal: req.body.animal_id});
            toS.save(function (err, doc) {
                if (!!err) {
                    res.status(400).send({message: "Nem sikerült a hozzaadas"});
                    return;
                }
                res.locals.shepherd.animals.push(doc);
                res.locals.shepherd.save(
                    function (err, doc) {
                        if (!!err) {
                            res.status(400).json({message: "Nem sikerült a hozzaadas"});
                            return;
                        }
                        return res.json(doc);
                    });
            });
        } else {
            res.status(400).json({message: 'Not valid sherpherd animal...'});
        }
    };
};
