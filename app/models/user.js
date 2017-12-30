var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    username     : String,
    password     : String,
    admin        : { type: Boolean, default: false },
    owner        : Boolean,
    team         : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    name         : { type: String, default: "Owner" },
    balance      : { type: Number, default: 1500000 },
    round1      : { type: Number, default: 1000000 },
    round2      : { type: Number, default: 500000 }

    },
    {
        timestamps: true
    });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);