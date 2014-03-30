var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

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
    userName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };
  var User = mongoose.model('User', userSchema);

  // insert seed data
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'jsimmons');
      User.create({firstName:'Javier', lastName:'Simmons', userName:'jsimmons', salt: salt, hashed_pwd: hash, roles: ['admin']});

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'cweaver');
      User.create({firstName:'Christy', lastName:'Weaver', userName:'cweaver', salt: salt, hashed_pwd: hash, roles: []});
 
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'asteward');
      User.create({firstName:'Adam', lastName:'Steward', userName:'asteward', salt: salt, hashed_pwd: hash});
    }
  });

};
