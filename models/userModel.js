const mongoose = require('mongoose');

const User= new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      
    },

    password: {
      type: String,
      required: true
    },

    address: {
      type: String
    },

    contactNumber: {
      type: String
    },

    role: {
      type: String,
      enum: ['User', 'Admin', 'Doctor'],
      default: 'User'
    }, 
    imagePath:{
         type: String
    } 
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('user', User);
      
