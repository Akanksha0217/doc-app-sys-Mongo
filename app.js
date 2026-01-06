const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const userRoute = require('./routes/userRoute');

const app=express()
const port= process.env.PORT || 7000

app.use(express.json())

app.use('/api/user', userRoute);



app.get('/',(req,res)=> res.send('Hello World'))

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
  })
})

//app.listen(port,()=>console.log(`Example app listening on port ${port}`))