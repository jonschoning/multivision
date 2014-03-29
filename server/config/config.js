var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var prod_mongo_pw = process.env.PROD_MONGO_PW || '';

module.exports = {
  development: {
    db: 'mongodb://localhost/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://admin:'+prod_mongo_pw+'@ds035557.mongolab.com:35557/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};

