module.exports = function(app, db) {
    app.post('/player', (req, res) => {
        db.collection('player').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/players')
        })
    });

    app.get('/players', (req, res) => {
        db.collection('player').find().toArray((err, result) => {
        if (err) return console.log(err)
            // renders players.ejs
            res.render('players.ejs', {player: result})
        })
    });
};
