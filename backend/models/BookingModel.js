const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    hotelId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    options: { type: Object},
    address: { type: String, required: true },
    reserveDates: { type: [ Date ]},
});

module.exports = mongoose.model("Booking", BookingsSchema);