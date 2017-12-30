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
    lead     : String,
    round    : { type: Number, min: 1, max: 2, default: 2 },
    round1   : [
        {
            team : String,
            amount : { type: Number, default: 0 }
        }
    ],
    round2   : [
        {
            team : String,
            amount : { type: Number, default: 0 }
        }
    ],
    bids     : [
        {
            team: String,
            amount: { type: Number, default: 0 }
        }
    ],
    price    : { type: Number, default: 0 },
    available : { type: Boolean, default: true }

    },
    {
       timestamps: true
    });

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Player', playerSchema);