
/**
 * POST
 * Elmenti az uj allatfajt, ha nem kap id-t. Ha kap akkor modositja a mar meglevot.
 * AJAX-osan lesz hivvan, ezert JSON-nel ter vissza.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
