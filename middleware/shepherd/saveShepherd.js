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

const hasEntityInObj = require('../hasEntityInObj');

module.exports = function (objectrepository) {
    const animalModel = requireOption(objectrepository, 'shepherdModel');
    return function (req, res, next) {

        if (req.method === 'GET') {
            if (!!res.locals.shepherd && !!res.locals.shepherd._id) {
                res.locals.mode = 'Updating';
            } else {
                //Bizonyara uj paszor lesz, mert nincsen id-ja.
                res.locals.mode = 'Creating';
                res.locals.shepherd = {};
            }
            return next();
        } else if (req.method === 'POST') {
            if (hasEntityInObj(req.body, 'shepherd')) { //erkezett valid pasztor a req-bol
                let toBeSaved = null;
                if (req.body.hasOwnProperty('_id') && !!req.body._id) {
                    toBeSaved = res.locals.shepherd;
                    toBeSaved.name = req.body.name;
                    toBeSaved.area = req.body.area;
                    toBeSaved.born = req.body.born;
                    toBeSaved.address = req.body.address;
                } else {
                    toBeSaved = new animalModel({
                        name: req.body.name,
                        area: req.body.area,
                        born: req.body.born,
                        address: req.body.address
                    });
                }
                if (!!req.body['profile_img'] && !!res.locals.uploaded_image_path) {
                    toBeSaved.image_path = res.locals.uploaded_image_path;
                    res.locals.uploaded_image_path = null;
                }
                toBeSaved.save(function (err, doc) {
                    if (!!err) {
                        res.status(400).send({message: "Nem sikerült a hozzaadas"});
                        return;
                    }
                    return res.redirect('/list');
                });
            }

        } else {
            res.status(400).send('Not valid sherpherd...');
        }
    }
};
