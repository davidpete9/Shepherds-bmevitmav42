const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        console.log('hi');
        req.session.destroy(err => {
            res.redirect('/login');
        });
    };
};
