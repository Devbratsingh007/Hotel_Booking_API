const router = require('express').Router()
const {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability} = require('../controller/roomCont') 


router.post('/:hotelid', createRoom)

router.post('/updateroom/:id/:roomId', updateRoomAvailability)
// router.post('/login', login)


router.put('/:id', updateRoom)
// router.put('/:id', updateUserPassword)
router.delete('/:hotelid/:id', deleteRoom)


router.get('/:id', getRoom)
router.get('/', getAllRooms)




module.exports = router