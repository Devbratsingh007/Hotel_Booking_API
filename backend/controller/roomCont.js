const  Room = require('../models/RoomModel')
const  Hotel = require('../models/HotelModel')
const  Bookings = require('../models/BookingModel')

const createRoom = async (req, res, next) => {
		const hotelId = req.params.hotelid;
		const newRoom = new Room(req.body);

		try {
			const savedRoom = await newRoom.save();
			try {
				await Hotel.findByIdAndUpdate(hotelId, {
					$push: { rooms: savedRoom._id },
				});
			} catch (err) {
				next(err);
			}
			res.status(200).json(savedRoom);
		} catch (err) {
			next(err);
		}
}

const updateRoom =async (req, res, next) => {
		try {
			const updatedRoomData = await Room.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updatedRoomData);
		} catch (err) {
			next(err);
		}
}

const deleteRoom = async (req, res, next) => {
		const hotelId = req.params.hotelid;
		try {
			await Room.findByIdAndDelete(req.params.id);
			try {
				await Hotel.findByIdAndUpdate(hotelId, {
					$pull: { rooms: req.params.id },
				});
			} catch (err) {
				next(err);
			}
			res.status(200).json({ msg: "room has been deleted" });
		} catch (err) {
			next(err);
		}
}

const getRoom =	async (req, res, next) => {
		try {
			const getSingleRoom = await Room.findById(req.params.id);
			res.status(200).json(getSingleRoom);
		} catch (err) {
			next(err);
		}
}

const getAllRooms = async (req, res, next) => {
	console.log("yrdytf")
		try {
			const getAllRooms = await Room.find();
			res.status(200).json(getAllRooms);
		} catch (err) {
			next(err);
		}
}

const updateRoomAvailability = async (req, res, next) => {
		// const userID = req.user.id;
		const userID = req.params.id;
		const roomID = req.params.roomId;
		try {
			await Room.updateOne(
				{ "roomNumbers._id": roomID },
				{
					$push: {
						"roomNumbers.$.unAavailableDates": req.body.dates,
					},
				}
			);
			try{
 				const newBooking = new Bookings({ 
					userId: userID, 
					roomId: roomID,
					hotelId: req.body.hotelId,
					title: req.body.title,
					address: req.body.address,
					reserveDates: req.body.dates,
					options: req.body.options,
					price: req.body.price
				})
				const bookedRoom = await newBooking.save();
				res.status(200).json(bookedRoom);
			}catch(err){
				next(err);
			}
			// res.status(200).json("Room has been updated");
		} catch (err) {
			next(err);
		}
}

module.exports ={
	createRoom,
	deleteRoom,
	updateRoom,
	getRoom,
	getAllRooms,
	updateRoomAvailability
}
