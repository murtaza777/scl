const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
const mongo = require('./config/mongo');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

var db;

MongoClient.connect(mongo.url, (err, client) => {
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