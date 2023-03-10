const  mongoose = require("mongoose");


const HotelSchema = new mongoose.Schema({
	type: { type: String, required: true },
	city: { type: String },
	address: { type: String, required: true },
	distance: { type: String, required: true },
	photos: { type: [String] },
	// description:  { type: String, required: true },
	// title: { type: String, required: true },
	// rating: { type: Number, min: 0, max: 5 },
	rooms: { type: [String] },
	// cheapestPrice:{ type: Number, required: true },
	// featured: { type: Boolean, default: false },
    // freeTaxi: { type: Boolean, default: false },
    // freeCancel: { type: Boolean, default: false },
});

module.exports =  mongoose.model("Hotel", HotelSchema);
