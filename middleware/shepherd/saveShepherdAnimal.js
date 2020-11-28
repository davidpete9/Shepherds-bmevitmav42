/**
 * POST (/shepherd/:shepherdid/animals/new)
 * Egy pasztorhoz fog tudni hozzadrendelni egy allatot, es azt, hogy hanyat birtokol belole. A modositast itt masik MV fogja kezelni (updateShepherdAnimal)
 *  AJAX-osan lesz csak hivva,ezert JSON-nel fog visszaterni
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const shepherdAnimal = requireOption(objectrepository, 'shepherdAnimalModel');
    return function (req, res, next) {
        let animal_id = req.body.animal_id;
        let quantity = req.body.quantity;
        let toS = new shepherdAnimal({quantity: quantity, animal: animal_id, shepherd: req.params['shepherdid']});
        toS.save(function (err, doc) {
            if (!!err) {
                res.status(400).send({message: "Nem sikerült a hozzaadas"});
                return;
            }
            return res.json(doc);
        });
    };
};
