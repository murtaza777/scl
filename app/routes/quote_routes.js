module.exports = function(app, db) {
    app.post('/quotes', (req, res) => {
        db.collection('quotes').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/')
        })
    });
};