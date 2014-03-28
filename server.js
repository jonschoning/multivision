var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var prod_mongo_pw = process.env.PROD_MONGO_PW || '';
var app = express();

function compile(str, path) {
  return stylus(str).set('filname', path);
}

// configure
app.configure(function() {
  app.set('views', __dirname + '/server/views');
  app.set('view engine','jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));
  app.use(express.static(__dirname + '/public'));
});

// mongo setup
if (env === 'development') {
  mongoose.connect('mongodb://localhost/multivision');
} else {
  mongoose.connect('mongodb://admin:'+prod_mongo_pw+'@ds035557.mongolab.com:35557/multivision');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});

// routes
app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});
app.get('*', function(req, res) {
  res.render('index');
});

// listen
var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port ' + port + '...');
