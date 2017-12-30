/**
 * Created by murtaza on 25/12/2017.
 */
var Player = require('../models/player');
var User = require('../models/user');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    /*app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });*/

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        Player.find({}).then(players => {
            User.find({}).limit(4).then(users => {
                res.render('profile', {
                    players: players,
                    users: users,
                    user: req.user
                });
            });
        }).catch(err => {
            res.sendStatus(404);
        });
        /*res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });*/
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/players', isLoggedIn, function(req, res) {
        if (req.user.admin) {
            Player.find().lean().exec(function (err, result) {
                console.log(result);
                res.render('players.ejs', {player: result, user: req.user})
            });
        } else {
            res.redirect("/profile")
        }
    });

    app.post('/player', function(req, res) {
        // db.collection('player').insertOne(req.body, (err, result) => {
        Player.create(req.body, function (err, player) {
            if (err) return console.log(err);

            console.log('saved to database');
            res.redirect('/players')
        });
    });

    app.get('/assign', isLoggedIn, function(req, res) {
        Player.find({}).then(players => {
            User.find({}).limit(4).then(users => {
                res.render('assign', {
                    players: players,
                    users: users,
                    user: req.user
                });
            });

        }).catch(err => {
            res.sendStatus(404);
        });
    });

    /*app.post('/assign', isLoggedIn, (req, res) => {
        let q = req.body.q;
        console.log(req.body.q)
        let query = {
           "name": {"$regex": q, "$options": "i"}
        };

        User.find({}).limit(4).then( users => {
            Player.find(query).limit(6).then(players => {
                // console.log(players)
                // console.log(users)
                res.render('assign', {
                    players: players,
                    users: users,
                    user: req.user
                });
            });

        }).catch(err => {
                res.sendStatus(404);
        });
    });*/

    app.post('/assign', isLoggedIn, (req, res) => {
        console.log(req.body);
        User.findOne({'username': req.body.teams}, function (err, user) {
            console.log("user");
            console.log(user);
            if(err){
                res.json(err);
                console.log(user);
            }
            if(user){
                //If group is found loop trough the users
                Player.findOne({'name': req.body.name}, function (err, player) {
                    console.log("player");
                    console.log(player);
                    user.team.push(player._id);
                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    player.available = false;
                    console.log(req.body.bid);
                    player.price = req.body.bid;
                    player.round = req.body.round;
                    player.save(function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    res.redirect('/profile')
                });

            } else{
                //Do what you need to do if group hasn't been found
            }
        })
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
