const quoteRoutes = require('./quote_routes');
const playerRoutes = require('./player_routes');
const loginRoutes = require('./login_routes');
module.exports = function(app, db, passport) {
    quoteRoutes(app, db);
    playerRoutes(app, db);
    loginRoutes(app, db, passport);
    // Other route groups could go here, in the future
};