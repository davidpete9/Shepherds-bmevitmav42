
/**
 * Leellenorzi a beegetett jelszot
 */


const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {

        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'titok') {
            req.session.loggedin = true;
            return req.session.save(err => res.redirect('/list'));
        }

        res.locals.error = 'Hibás jelszó!';
        return next();
    };
};
