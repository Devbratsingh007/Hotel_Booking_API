const Room = require('../models/RoomModel')
const Booking = require('../models/BookingModel')

const getBookings= async (req, res, next) => {
		try {
			const bookings = await Booking.find({ userID: req.user.id });
			res.status(200).json(bookings);
		} catch (err) {
			next(err);
		}
}

const removeBookings = async (req, res, next) => {
		const bookingId = req.params.id;
		try {
			const findBooking = await Booking.findById(bookingId);
			try {
				await Room.updateOne(
					{ "roomNumbers._id": findBooking.roomId },
					{
						$pullAll: {
							"roomNumbers.$.unAavailableDates": req.body.dates,
						},
					}
				);
				try {
					await Booking.findByIdAndDelete(bookingId);
                    res.status(200).json("Hotel remove successfully");
				} catch (err) {
					next(err);
				}
			} catch (err) {
				next(err);
			}
		} catch (err) {
			next(err);
		}
}

module.exports = {
	getBookings,
	removeBookings
}
