
/**
 * Visszater az id-val megadott pasztorral, es az ő osszes állatával.
 * Valahogy így:
 * {
 *        'name': 'Pista'
 *        'area': 'Alfold'
 *        ...
 *        'animals': [
 *           {
 *               'name': 'Kecske', <---- betoltom az allat osszes adatat
 *               'price': 32000,
 *               'animal_id': 42
 *               'quantity': 5    <--- tehat ide betoltom azt IS, hogy hany darab van belole neki.
 *           }
 *   A res.local.shepherd-be fogja tenni.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const shepherdModel = requireOption(objectrepository, 'shepherdModel');
    return function (req, res, next) {
        if (!req.params.hasOwnProperty('shepherdid') || !req.params['shepherdid']) {
            throw Error("shepherdid  not found");
        }
        const id = req.params['shepherdid'];
        shepherdModel.findOne({_id: id}, (err, shepherd) => {
            if (err) {
                return next(err);
            }
            shepherd.animals = [];
            res.locals.shepherd = shepherd;
            return next();
        });

    };
};
