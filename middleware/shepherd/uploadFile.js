/**
* Feltölti a fájlot egy ideiglenes helyre.
 *
 * res.locals.uploaded_image_path ba rakja az eleresi utjat.
* */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log(req.body.files);
        if (req.method !== "POST" || !req.files || Object.keys(req.files).length === 0) {
            return next();
        }
        let profilePic = req.files['profile_img'];

        if (!profilePic) {
            return next();
        }

        let mimetype = profilePic.mimetype;
        if (!mimetype.startsWith("image/")) {
            res.status(400).send("Not an image!");
        }

        let extension = profilePic.name.substr(profilePic.name.lastIndexOf('.'));
        let new_filename = new Date().valueOf()+extension;  //csak hogy tutira egyedi legyen...
        profilePic.mv('public/'+new_filename, function(err) {
            if (err)
                return res.status(500).send(err);
            res.locals.uploaded_image_path = '/'+new_filename;
            console.log(profilePic);
            return next();
        });

    };
};
