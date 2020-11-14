//const animalModel = require('./models/animal');
/*let animal = new animalModel();
animal.name = "Kecske";
animal.avg_cost = 223;
animal.save((e) => console.log(e));


animalModel.find({}, (e, d) => {console.log(d)});
*/


const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));


app.use(function (req, res, next) {
    res.templ_vars = {};
    res.templ_vars.error = [];

    return next();
});


// Load routing
require('./route/index')(app);

app.listen(3000, function () {
    console.log('Hello :3000');
});


