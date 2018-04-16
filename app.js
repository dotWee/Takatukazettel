'use strict';

// dependencies
var SwaggerExpress = require('swagger-express-mw');
var mongoose = require('mongoose');
var pug = require('pug');
var express = require('express');
var app = express();
var database = require('./config/database'); 

// set view engine
app.set("view engine", "pug");

// enable bower
app.use('/public',  express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// for testing
module.exports = app; 

// required config
var config = {
  appRoot: __dirname 
};

// connect to mongo database or use in-memory
if (database.useMongoDb) {

    mongoose.connect(process.env.MONGO_URL);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to database');
  });
}

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

  app.get('/', function(req, res) {
    res.render('index.pug');
  });
});
