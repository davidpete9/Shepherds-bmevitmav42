
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
    return function (req, res, next) {

        res.locals.shepherds = [
            {
                _id: 42,
                name: 'Pista',
                area: 'Alföld',
                animals: [
                    {
                        name: 'kecske'
                    },
                    {
                        name: 'malac'
                    }
                ]
            },
            {
                _id: 11,
                name: 'János',
                area: 'Hortobágy',
                animals: [
                    {
                        name: 'bika'
                    },
                    {
                        name: 'ló'
                    }
                ]
            },
        ];
        next();
    };
};
