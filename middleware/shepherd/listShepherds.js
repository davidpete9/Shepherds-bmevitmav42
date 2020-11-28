
/**
 * A db-bol betolti az osszes pasztort, a hozzajuk tartozo allatokkal egyutt.
 * (valahogy ugy gondoltam, hogy ilyesmit allitok elo valahogy:
 *   [ {
 *        'name': 'Pista'
 *        'area': 'Alfold'
 *        ...
 *        'animals': [
 *           {
 *               'cost': 32000,
 *               'animal_id': 42
 *               'animal': {
 *                   'name': 'Kecske',
 *                   'quantity': 43,
 *                   '_id': '42'
 *               }
 *
 *           },
 *           {
 *               ...
 *           }
 *         ]
 *
 *    }, ... ]
 * )
 * Majd ide teszi be: res.locals.shepherds
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const shepherdModel = requireOption(objectrepository, 'shepherdModel');


    return function (req, res, next) {

        shepherdModel.find({}).populate({path:'animals', populate: {path: 'animal'}}).exec((err, shepherds) => {
            if (err) {
                return next(err);
            }
            res.locals.shepherds = shepherds;
            return next();
        });
    };
};
