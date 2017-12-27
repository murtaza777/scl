const quoteRoutes = require('./quote_routes');
const playerRoutes = require('./player_routes');
const loginRoutes = require('./login_routes');
module.exports = function(app, passport) {
    //quoteRoutes(app, db);
    playerRoutes(app);
    loginRoutes(app, passport);
    // Other route groups could go here, in the future
};