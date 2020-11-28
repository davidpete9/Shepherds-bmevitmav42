/**
 * POST
 * Elmenti az uj allatfajt, ha nem kap id-t. Ha kap akkor modositja a mar meglevot.
 * AJAX-osan lesz hivvan, ezert JSON-nel ter vissza.
 */
const requireOption = require('../requireOption');

const hasEntityInObj = require('../hasEntityInObj');

module.exports = function (objectrepository) {
    const animalModel = requireOption(objectrepository, 'animalModel');
    return function (req, res, next) {
        if (hasEntityInObj(req.body, 'animal')) { //erkezett valid allat a req-bol
            let toBeSaved = null;
            if (req.body.hasOwnProperty('_id')) { //modositani kell
                toBeSaved = res.locals.animal; //ilyenkor az elozo middlewarenek ezt mar be kellett toltenie
                if (!toBeSaved) {
                    throw Error("animal not found");
                }
                toBeSaved.name = req.body.name;
                toBeSaved.cost = req.body.cost;

            } else {
                toBeSaved = new animalModel({'name': req.body.name, 'cost': req.body.cost});
            }
            toBeSaved.save(function (err, doc) {
                if (!!err) {
                    res.status(400).json({message: "Nem sikerült a hozzaadas"});
                    return;
                }
                res.json(doc);
            });
            } else {
                res.status(400).json({message: 'Not valid animal...'});
            }
    };
};
