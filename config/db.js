const mongoose= require('mongoose');
require('dotenv').config()

const connectDB= async() =>{
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("Data base is connected____________________")
  } catch (error) {
    console.log("failed to connect",error.message)
    process.exit(1);
    
  }
}

//connectDB();
module.exports = connectDB