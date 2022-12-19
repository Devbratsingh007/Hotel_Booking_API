const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const connectDB = require('./backend/config/db')
const userRout = require('./backend/routes/userRout')
const hotelRout = require('./backend/routes/HotelRout')
const roomRout = require('./backend/routes/roomRout')
const bookingRout = require('./backend/routes/bookingRout')

const port = process.env.PORT || 5000

connectDB()

app.use(express.json())

app.use('/api/user', userRout)
app.use('/api/hotel', hotelRout)
app.use('/api/hotel/room', roomRout)  
app.use('/api/booking', bookingRout)  

app.listen(port, ()=>{
    console.log(`server is started on post ${port}`)
})










