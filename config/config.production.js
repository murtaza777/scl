/**
 * Created by murtaza on 24/12/2017.
 */
var config = require('./config.global');

config.env = 'production';
// config.hostname = 'test.example';
config.mongo.db = 'heroku_b8sp0st5';

module.exports = config;
