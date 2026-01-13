const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
     userID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    specialist: {
      type: String,
      required: true,
      trim: true
    },

    fees: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Reject'],
      default: 'Pending'
    },

    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
   
    
  }, 
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);
