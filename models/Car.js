const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_brand: {
        type: String,
        required: true
    },
    car_price: {
        type: Number,
        required: true
    },
    car_properties: {
        luggage: {
            type: Number,
            required: true
        },
        car_plate: {
            type: Number,
            required: true
        },
        doors: {
            type: Number,
            required: true
        },
        passenger: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model('car', carSchema)