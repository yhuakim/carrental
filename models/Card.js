const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    nameOnCard: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    card_credentials: {
        card_cvv: {
            type: Number,
            required: true
        },
        card_number: {
            type: Number,
            required: true
        },
        card_expiry: {
            type: Date,
            required: true
        }
    }
});

module.exports = mongoose.model('card', cardSchema)