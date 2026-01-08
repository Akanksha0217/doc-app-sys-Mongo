const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const userRoute = require('./routes/userRoute');
const docRoute =require('./routes/doctorRoute')
const appointmentRoute = require('./routes/appointmentRoute')
const cors=require('cors')
const app=express()
const port= process.env.PORT || 7000

app.use(express.json())
app.use(cors())
app.use('/api/user', userRoute);
app.use('/api/doctor', docRoute)
app.use('/api/appointment', appointmentRoute)

app.get('/',(req,res)=> res.send('Hello World'))

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
  })
})

//app.listen(port,()=>console.log(`Example app listening on port ${port}`))