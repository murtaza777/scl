/**
 * Created by murtaza on 24/12/2017.
 */
var config = module.exports = {};

config.env = 'development';
//config.hostname = 'dev.example.com';

//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGODB_URI;
config.mongo.db = 'scl';
