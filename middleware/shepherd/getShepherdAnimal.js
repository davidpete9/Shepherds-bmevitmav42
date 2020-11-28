
/**
 *
 * GET
 * lekeri a megadott pasztor - allatot
 * A res.local.shepherd_animal-ba rakja.
 *
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const shepherdAnimal = requireOption(objectrepository, 'shepherdAnimalModel');

    return function (req, res, next) {
        if (!req.params.hasOwnProperty('shepherdanimalid') || !req.params['shepherdanimalid']) {
            throw Error("shepherdanimalid not found");
        }
        const id = req.params['shepherdanimalid'];
        shepherdAnimal.findOne({_id: id}, (err, sh_animal) => {
            if (err) {
                return next(err);
            }
            res.locals.shepherd_animal = sh_animal;
            return next();
        });
    };
};
