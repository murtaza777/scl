var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var playerSchema = mongoose.Schema({

    name     : String,
    email    : String,
    team     : String,
    phone    : Number,
    bat      : { type: Number, min: 1, max: 10, default: 0 },
    bowl     : { type: Number, min: 1, max: 10, default: 0 },
    wk       : { type: Number, min: 1, max: 10, default: 0 },
    lead     : Boolean,
    round    : { type: Number, min: 0, max: 2, default: 0 },
    bids     : [
        {
            team: String,
            amount: { type: Number, default: 0 }
        }
    ],
    price    : { type: Number, default: 0 }

});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Player', playerSchema);