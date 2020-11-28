
/**
 * A db-bol betolti az osszes pasztort, a hozzajuk tartozo allatokkal egyutt.
 * (valahogy ugy gondoltam, hogy ilyesmit allitok elo valahogy:
 *   [ {
 *        'name': 'Pista'
 *        'area': 'Alfold'
 *        ...
 *        'animals': [
 *           {
 *
 *               'name': 'Kecske', <---- betoltom az allat osszes adatat
 *               'cost': 32000,
 *               'animal_id': 42
 *
 *               'quantity': 5    <--- tehat ide betoltom azt IS, hogy hany darab van belole neki.
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

        shepherdModel.find({}).populate('ShepherdAnimal').exec((err, shepherds) => {
            if (err) {
                return next(err);
            }
            console.log(shepherds);
            res.locals.shepherds = shepherds;
            return next();
        });
    };
};
