var mongoose = require('mongoose');

module.exports = function(config) {

  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('multivision db opened');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });

  var User = mongoose.model('User', userSchema);

  // insert seed data
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      User.create({firstName:'Javier', lastName:'Simmons', userName:'jsimmons'});
      User.create({firstName:'Christy', lastName:'Weaver', userName:'cweaver'});
      User.create({firstName:'Adam', lastName:'Steward', userName:'asteward'});
    }
  });

};
