'use strict';

// dependencies
var SwaggerExpress = require('swagger-express-mw');
var mongoose = require('mongoose');
var pug = require('pug');
var express = require('express');
var app = express();

// set view engine
app.set("view engine", "pug");

// make static sources accessible
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/knockout/build/output'));

// for testing
module.exports = app;

// required config
var config = {
    appRoot: __dirname
};

// connect to mongo database
mongoose.connect(process.env.MONGO_URL);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('connected to database');
    });

// setup swagger
SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // install middleware
    swaggerExpress.register(app);

    let port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/items']) {
        console.log('try this:\ncurl http://localhost:' + port + '/api/items');
    }

    app.get('/', function (req, res) {
        res.render('index.pug');
    });
});
