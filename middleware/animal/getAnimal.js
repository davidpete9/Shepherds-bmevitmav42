
/**
 *
 * GET
 * lekeri a megadott allat osszes adatat
 * A res.local.animal-ba rakja.
 *
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const animalModel = requireOption(objectrepository, 'animalModel');

    return function (req, res, next) {
        if (!req.params.hasOwnProperty('animalid') || !req.params['animalid']) {
            throw Error("animal id not found");
        }
        const id = req.params['animalid'];
        animalModel.findOne({_id: id}, (err, animal) => {
            if (err) {
                return next(err);
            }
            res.locals.animal = animal;
            return next();
        });
    };
};
