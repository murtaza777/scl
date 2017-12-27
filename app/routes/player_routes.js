var Player = require('../models/player')
module.exports = function(app) {
    app.post('/player', (req, res) => {
        // db.collection('player').insertOne(req.body, (err, result) => {
        Player.create(req.body, function (err, player) {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/players')
        })
    });

    app.get('/players', (req, res) => {
        /*db.collection('player').find().toArray((err, result) => {
            if (err) return console.log(err)
            // renders players.ejs
            res.render('players.ejs', {player: result})
        })*/
        Player.find().lean().exec(function (err, result) {
            console.log(result)
            res.render('players.ejs', {player: result})
        });
    });
};
