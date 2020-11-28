/**
 * Using the template engine render the values into the template
 */

const requireOption = require('./requireOption');
var moment = require('moment');


module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        console.log('rendering ',viewName);
        res.locals.moment = moment;
        res.render(viewName, res.locals);
    };

};
