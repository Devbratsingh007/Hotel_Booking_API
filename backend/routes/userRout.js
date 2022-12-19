const router = require('express').Router()
const {login,register, updateUser, updateUserPassword, deleteUser,getUser, getAllUser} = require('../controller/UserCont') 


router.post('/register', register)
router.post('/login', login)


router.put('/:id', updateUser)
router.put('/:id', updateUserPassword)
router.delete('/:id', deleteUser)


router.get('/:id', getUser)
router.get('/', getAllUser)




module.exports = router