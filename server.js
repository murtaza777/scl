const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
// const url = require('url');
// const path = require('path');

//const mongo = require('./config/mongo');
const cfg = require('./config');

const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect(cfg.mongo.uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('scl');
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
// Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});