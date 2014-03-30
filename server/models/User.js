
var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

  var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: String,
    userName: {
      type:String, 
      required:'{PATH} is required!',
      unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };

  var User = mongoose.model('User', userSchema);

  function createDefaultUsers() {
    // insert seed data
    User.find({}).exec(function(err, collection) {
      if(collection.length === 0) {
        var salt, hash;

        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, 'j@j.com');
        User.create({firstName:'Javier', lastName:'Simmons', userName:'j@j.com', salt: salt, hashed_pwd: hash, roles: ['admin']});

        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, 'c@c.com');
        User.create({firstName:'Christy', lastName:'Weaver', userName:'c@c.com', salt: salt, hashed_pwd: hash, roles: []});
   
        salt = encrypt.createSalt();
        hash = encrypt.hashPwd(salt, 'a@a.com');
        User.create({firstName:'Adam', lastName:'Steward', userName:'a@a.com', salt: salt, hashed_pwd: hash});
      }
    });
  }

exports.createDefaultUsers = createDefaultUsers;
