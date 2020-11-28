


const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.set('view engine','ejs');
app.use(fileUpload({createParentPath: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

