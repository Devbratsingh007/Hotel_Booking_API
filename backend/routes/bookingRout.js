const router = require('express').Router()
const {getBookings, removeBookings} = require('../controller/bookingCont') 


// router.post('/register', register)
// router.post('/login', login)


// router.put('/:id', updateUser)
// router.put('/:id', updateUserPassword)
// router.delete('/:id', deleteUser)


// router.get('/:id', getUser)
router.get('/:id', getBookings)




module.exports = router