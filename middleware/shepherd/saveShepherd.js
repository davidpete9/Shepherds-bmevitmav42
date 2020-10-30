/**
 *
 * Elment egy uj pasztort, vagy ha kap id-t akkor modositja a meglevot.
 * Tehat ez egy POST request lesz. A hozzadasa/modositas utan majd a listára fogja visszairanyitani.
 * A res.local.shepherd tartalmat fogja a template feldolgozni.
 *
 * Ha GET-tel hivjuk, akkor csak a eldonti, hogy ez majd modositas vagy hozzaadas lesz a res.locals.shepherd tartalmabol.
 *
 */
const requireOption = require('../requireOption');

const helpers = require('../helpers');

module.exports = function (objectrepository) {
    return function (req, res, next) {

        if (req.method === 'GET') {
            if (!!res.locals.shepherd && !!res.locals.shepherd._id) {
                res.locals.mode = 'Updating';
            }
            else  {
                //Bizonyara uj paszor lesz, mert nincsen id-ja.
                res.locals.mode = 'Creating';
                res.locals.shepherd = {};
            }
            return next();
        }
        else if (req.method === 'POST') {
            if (hasEntityInObj(req.body, 'shepherd')) { //erkezett valid pasztor a req-bol

                if (req.body.hasOwnProperty('shepherd_id') && !!req.body.shepherd_id) {
                    //Modositani kell
                } else {
                    //Hozzad kell adni a db-hez az uj pasztort.
                }
                /* ... */
                res.locals.shepherd = null;
                return next();
            }
            else {
                res.status(400).send('Not valid sherpherd...');
            }
        }
    };
};
