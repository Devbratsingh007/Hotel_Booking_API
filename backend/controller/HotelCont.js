const Hotel  = require('../models/HotelModel')
const Room  = require('../models/RoomModel')

const setHotel = async(req, res, next) => {
		const {
			// title,
			type,
			city,
			address,
			distance,
            photos,
			// description,
			// rating,
			// cheapestPrice,
			// featured,
			// freeTaxi,
			// freeCancel,
		} = req.body;
		try {
			const createHotel = new Hotel({
				// title,
				type,
				city,
				address,
				distance,
				// description,
				// rating,
				// cheapestPrice,
				// featured,
				// freeTaxi,
				// freeCancel,
				photos,
			});
			const savedHotel = await createHotel.save();
			res.status(200).json(savedHotel);
		} catch (err) {
			next(err);
		}
}

const updateHotel =	async (req, res, next) => {
		try {
			const updatedHotelData = await Hotel.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updatedHotelData);
		} catch (err) {
			next(err);
		}
}

const deleteHotel =	async (req, res, next) => {
		try {
			await Hotel.findByIdAndDelete(req.params.id);
			res.status(200).json({ msg: "Hotel has been deleted" });
		} catch (err) {
			next(err);
		}
	}

const getHotel = async (req, res, next) => {
		try {
			const getSingleHotel = await Hotel.findById(req.params.id);
			res.status(200).json(getSingleHotel);
		} catch (err) {
			next(err);
		}
	}

const getHotels =	async (req, res, next) => {
		const { min, max, ...others } = req.query;
		try {
			const getAllHotels = await Hotel.find({
				...others,
				cheapestPrice: { $gt: min | 1, $lt: max || 9999 },
			}).limit(req.query.limit);

			// const getAllHotels = await HotelSchema.find()

			res.status(200).json(getAllHotels);
		} catch (err) {
			next(err);
		}
	}

	// async countByCity(req, res, next) {
	// 	const cities = req.query.cities.split(",");
	// 	try {
	// 		const list = await Promise.all(
	// 			cities.map((city) => {
	// 				return HotelSchema.countDocuments({ city: city });
	// 			})
	// 		);
	// 		res.status(200).json(list);
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// },

	// async countByType(req, res, next) {
	// 	try {
	// 		const hotelCount = await HotelSchema.countDocuments({ type: "hotels" });
	// 		const apartmentCount = await HotelSchema.countDocuments({
	// 			type: "apartments",
	// 		});
	// 		const resortCount = await HotelSchema.countDocuments({ type: "resorts" });
	// 		const villaCount = await HotelSchema.countDocuments({ type: "villas" });
	// 		const cabinCount = await HotelSchema.countDocuments({ type: "cabins" });

	// 		res.status(200).json([
	// 			{ type: "hotels", count: hotelCount },
	// 			{ type: "apartments", count: apartmentCount },
	// 			{ type: "resorts", count: resortCount },
	// 			{ type: "villas", count: villaCount },
	// 			{ type: "cabins", count: cabinCount },
	// 		]);
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// },

const getHotelRooms =	async (req, res, next) => {
		try {
			const hotel = await Hotel.findById(req.params.id);
			const list = await Promise.all(
				hotel.rooms.map((room) => {
					return Room.findById(room);
				})
			);
			res.status(200).json(list);
		} catch (err) {
			next(err);
		}
}

const searchHotel =	async (req, res, next) => {
		const regex = new RegExp(req.params.place, "i");
		console.log(regex)
		try {
			
			const result = await Hotel.find({ city: regex })
				.select({ city: 1 })
				.limit(5);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
}

module.exports = {
    setHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    getHotelRooms,
    searchHotel
}