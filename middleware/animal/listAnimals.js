
/**
 * Kilistazza az osszes allatfajt, amelyek hozza vannak adva.
 * A res.local.animals-ba fogja tenni.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const animalModel = requireOption(objectrepository, 'animalModel');

    return function (req, res, next) {

        animalModel.find({}, (err, animals) => {
            if (err) {
                return next(err);
            }
            res.locals.animals = animals;
            return next();
        });
    };
};
