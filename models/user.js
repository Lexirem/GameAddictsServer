const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creamos el modelo User
// el modelo User tiene que tener un username y un password, que tienen que ser strings. También deberán tener un timestamps.

const userSchema = new Schema({
    username: String,
    password: String,
    age: String,
    gender: { type: String, enum: ["Male", "Female"] },
    disponibility: String,
    email: String,
    languages: String,
    country: String,
    city: String,
    experience: { type: String, enum: ["low", "medium", "high"] },
    lookingForSailAsCrew: {type:Boolean, default : false},
    image: String,
    hasBoat: {type:Boolean, default : false},
    
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;