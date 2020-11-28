const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const shepherdModel = requireOption(objectrepository, 'shepherdModel');

    return function (req, res, next) {

        let query = '';
        let query_obj = {};

        if (req.query.hasOwnProperty('query') && !!req.query.query) {
             query = ''+req.query.query;
             query_obj = {$or: [{'name': query}, {'area': query}]};
        }

        res.locals.query = query;

        shepherdModel.find(query_obj)
            .populate({path:'animals', populate: {path: 'animal'}}).exec((err, shepherds) => {
            if (err) {
                return next(err);
            }
            res.locals.shepherds = shepherds;
            return next();
        });
    };
};
