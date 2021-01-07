const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: String,
    players: Number, 
    type: { type: String, enum: ["Board", "VideoGame"] },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    image: String
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

