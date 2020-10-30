
/**
 * Kilistazza az osszes allatfajt, amelyek hozza vannak adva.
 * A res.local.animals-ba fogja tenni.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {

        res.locals.animals = [
            {_id:43, name: 'kecske', cost: 32000},{_id: 23, name: 'Ló', cost: 43211}

        ];
       return next();
    };
};
