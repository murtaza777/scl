const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const morgan       = require('morgan');

// const url = require('url');
const path = require('path');

//const mongo = require('./config/mongo');

const cfg = require('./config');

// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(cfg.mongo.uri, { useMongoClient: true }); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));

// required for passport
app.use(session({
    secret: 'verysecretivesecret',
    //name: cookie_name,
    //store: sessionStore, // connect-mongo session store
    //proxy: true,
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//var db;

MongoClient.connect(cfg.mongo.uri, (err, client) => {
    if (err) return console.log(err)
    //db = client.db(cfg.mongo.db);
    require('./app/routes')(app, passport);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})