
/**
 * Megnezi, hogy be van e lepva (majd a session-ben tarolom ezt.), kesobb ott fogja ellenorizni mindig.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        return next();
    };
};
