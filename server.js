var express = require('express'),
    stylus = require('stylus');
var env = process.env.NODE_ENV =process.env.NODE_ENV || 'development';
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

// routes
app.get('*', function(req, res) {
  res.render('index');
});

// listen
var port = 3030;
app.listen(port);
console.log('listening on port ' + port + '...');
