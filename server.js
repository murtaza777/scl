const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
// const url = require('url');
// const path = require('path');

//const mongo = require('./config/mongo');
const cfg = require('./config');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect(cfg.mongo.uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db(cfg.mongo.db);
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})