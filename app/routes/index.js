const quoteRoutes = require('./quote_routes');
const playerRoutes = require('./player_routes');
module.exports = function(app, db) {
    quoteRoutes(app, db);
    playerRoutes(app, db);
    // Other route groups could go here, in the future
};