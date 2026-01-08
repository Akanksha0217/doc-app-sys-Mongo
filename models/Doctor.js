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

    // Reference to User who created doctor
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    // Reference to User who updated doctor
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
   
    
  },
  {
    timestamps: true // creates createdAt & updatedAt
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);
