const quoteRoutes = require('./quote_routes');
module.exports = function(app, db) {
    quoteRoutes(app, db);
    // Other route groups could go here, in the future
};