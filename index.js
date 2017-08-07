var express = require('express');
var app = express();

var mongoose = require('mongoose');
var api = require('./api/models/api.model');
var bodyParser = require('body-parser');

var uri = 'mongodb://heroku_6r6vbg3f:gd6h18klv4vvpihh84u9b5ighg@ds149059.mlab.com:49059/heroku_6r6vbg3f';
mongoose.Promise = global.Promise
mongoose.connect(uri);

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/api.route');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//========================================================================
