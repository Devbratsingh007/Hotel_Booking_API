const mongoose =  require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    beds: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    area: { type: Number },
    desc: { type: String, required: true },
    roomNumbers: [{ number: Number, unAavailableDates: { type: [ Date ]} }],
}, { timestamps: true });

/*
    [
        { number: 101, unAavailableDates: [01.02.2022, 04.02,2022] }
        { number: 102, unAavailableDates: [] }
        { number: 103, unAavailableDates: [] }
    ]
*/

module.exports = mongoose.model("Room", RoomSchema);