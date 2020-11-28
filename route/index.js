const authMW = require('../middleware/auth/authMV');
const checkPassMW = require('../middleware/auth/checkPassw');
const renderMW = require('../middleware/renderMV');
const getShepherd = require('../middleware/shepherd/getShepherd');
const deleteShepherd = require('../middleware/shepherd/deleteShepherd');
const saveShepherd = require('../middleware/shepherd/saveShepherd');
const listShepherds = require('../middleware/shepherd/listShepherds');
const listAnimals = require('../middleware/animal/listAnimals');
const getAnimal = require('../middleware/animal/getAnimal');
const deleteAnimal = require('../middleware/animal/deleteAnimal');
const saveAnimal = require('../middleware/animal/saveAnimal');
const saveShepherdAnimal = require('../middleware/shepherd/saveShepherdAnimal');
const updateShepherdAnimal = require('../middleware/shepherd/updateShepherdAnimal');
const deleteShepherdAnimal = require('../middleware/shepherd/deleteShepherdAnimal');
const uploadFile = require('../middleware/shepherd/uploadFile');

const shepherdModel = require('../models/shepherd');
const animalModel= require('../models/animal');
const shepherdAnimalModel= require('../models/shepherd_animals');

module.exports = function (app) {
    const objRepo = {
        shepherdModel: shepherdModel,
        animalModel: animalModel,
        shepherdAnimalModel: shepherdAnimalModel
    };


   /* ------------------------------ PASZTOROK -------------------------------- */

    app.use('/list',
        authMW(objRepo),
        listShepherds(objRepo),
        renderMW(objRepo, 'index'));

    app.use('/shepherd/update/:shepherdid',
        authMW(objRepo),
        uploadFile(objRepo),
        getShepherd(objRepo),
        saveShepherd(objRepo),
        renderMW(objRepo, 'shepherdform'));

    app.use('/shepherd/new',
        authMW(objRepo),
        uploadFile(objRepo),
        saveShepherd(objRepo),
        renderMW(objRepo, 'shepherdform'));

    app.use('/shepherd/details/:shepherdid',
        authMW(objRepo),
        listAnimals(objRepo),
        getShepherd(objRepo),
        renderMW(objRepo, 'details'));

    /* AJAX-osan lesz hivva mindig, ezert JSON-nel ter vissza */
    app.delete('/shepherd/delete/:shepherdid',
        authMW(objRepo),
        getShepherd(objRepo),
        deleteShepherd(objRepo));

    /* ------------------------------ PASZTOROK ALLATAI -------------------------------- */
    /* Ezek kozul minden csak AJAX-osan lesz hivva, es JSON-nel  fog visszaterni.*/

    app.post('/shepherds/:shepherdid/animals/new',
        authMW(objRepo),
        getShepherd(objRepo),
        saveShepherdAnimal(objRepo));


    app.post('/shepherd/:shepherdid/animals/update/:animalid',
        authMW(objRepo),
        getShepherd(objRepo),
        updateShepherdAnimal(objRepo));

    app.delete('/shepherd/:shepherdid/animals/delete/:animalid',
        authMW(objRepo),
        getShepherd(objRepo),
        deleteShepherdAnimal(objRepo));


    /*-------------------ALLATOK------------------------------*/

    app.use('/animals/list',
        authMW(objRepo),
        listAnimals(objRepo),
        renderMW(objRepo, 'animals'));


    /* AJAX-osan lesznek hivva mindig, ezert JSON-nel ter vissza */

    app.post('/animals/new',
        authMW(objRepo),
        saveAnimal(objRepo));

    app.put('/animals/:animalid/update',
        authMW(objRepo),
        getAnimal(objRepo),
        saveAnimal(objRepo));

    app.delete('/animals/:animalid/delete',
        authMW(objRepo),
        getAnimal(objRepo),
        deleteAnimal(objRepo));

    app.get('/',
        checkPassMW(objRepo),
        function (req, res, next) {
            res.redirect('/list');
        }
    );

};
