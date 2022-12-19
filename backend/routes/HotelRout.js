const router = require('express').Router()
const {setHotel,  getHotel, getHotels, updateHotel,deleteHotel, searchHotel, getHotelRooms} = require('../controller/HotelCont') 


router.post('/', setHotel)


router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)


// router.get('/rooms/:id', getHotelRooms)

router.get('/:id', getHotel)

router.get('/', getHotels)

router.get('/:place', searchHotel)




module.exports = router