var passport = require('passport');

exports.authenticate = function(req, res, next) {
  var auth = passport.authenticate('local', function(err, user) {
    if(err) { return next(err); }
    if(!user) { res.send({success:false});}

    // required because we're using XHR to login
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      
      // TODO: don't send hashed_pwd and salt to client
      res.send({success:true, user: user});
    });

  });
  auth(req, res, next);
};
