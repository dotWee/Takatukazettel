'use strict';

// dependencies
var SwaggerExpress = require('swagger-express-mw');
var mongoose = require('mongoose');
var pug = require('pug');
var app = require('express')();
var database = require('./config/database'); 

// set view engine
app.set("view engine", "pug");

// for testing
module.exports = app; 

// required config
var config = {
  appRoot: __dirname 
};

// connect to database
mongoose.connect(database.localUrl);

// setup swagger
SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/items']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/items');
  }

  app.get('/', function (req, res) {
    res.render('index.pug');
  });
});