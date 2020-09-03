const mongoose = require('mongoose')

const transferSchema = new mongoose.Schema({
    bank_code: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    narration: {
        type: String,
    },
    reference: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transfer', transferSchema)