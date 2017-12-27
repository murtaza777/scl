const loginRoutes = require('./login_routes');
module.exports = function(app, passport) {
    loginRoutes(app, passport);
    // Other route groups could go here, in the future
};