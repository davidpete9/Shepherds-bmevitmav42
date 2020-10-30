
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
    return function (req, res, next) {


        //model.find( {_ii: req.params.id})
        res.locals.shepherd = {
            _id : 42,
            name: 'Pista',
            area: 'Alföld',
            animals: [
                {
                    name: 'kecske',
                    cost: 32000,
                    quantity: 42
                },
                {
                    name: 'malac',
                    cost: 23500,
                    quantity: 32
                }
            ]
        };


        next();
    };
};
