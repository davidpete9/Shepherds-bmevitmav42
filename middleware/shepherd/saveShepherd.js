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

const fs = require('fs');

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
                if (!!res.locals.shepherd) { // ha mar be van toltva, akkor biztos, hogy modisitas van
                    toBeSaved = res.locals.shepherd;
                    toBeSaved.name = req.body.name;
                    toBeSaved.area = req.body.area;
                    toBeSaved.born = req.body.born;
                    toBeSaved.address = req.body.address;
                    if (!!res.locals.uploaded_image_path) {
                        toBeSaved.image_path = res.locals.uploaded_image_path; //ha a foto modositom torlom a regit
                        fs.unlink('./public' + toBeSaved.image_path, function () {});
                    }
                } else {
                    toBeSaved = new animalModel({
                        name: req.body.name,
                        area: req.body.area,
                        born: req.body.born,
                        address: req.body.address
                    });
                    if (!!res.locals.uploaded_image_path) {
                        toBeSaved.image_path = res.locals.uploaded_image_path;
                    }
                }

                toBeSaved.save(function (err, doc) {
                    if (!!err) {
                        res.status(400).json({message: "Nem sikerült a hozzaadas"});
                        return;
                    }
                    return res.redirect('/list');
                });
            }

        } else {
            res.status(400).json({message: 'Not valid sherpherd...'});
        }
    }
};
