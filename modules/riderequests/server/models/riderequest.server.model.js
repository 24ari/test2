'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Riderequest Schema
 */
var RiderequestSchema = new Schema({
  // name: {
  //   type: String,
  //   default: '',
  //   required: 'Please fill Riderequest name',
  //   trim: true
  // },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  status:{
    type:String,
    default: "pending"
  },

  driverName:{
    type:String
  },

  requesterName:{
    type:String
  },

  rideId:{
    type:String
  },

  driverId:{
    type:String
  },

  requesterId:{
    type:String
  },

  arrival:{
    type:String
  },

  departure:{
    type:String
  },

  isAccepted:{
    type: Boolean,
    default:false
  },

  isDeclined:{
    type: Boolean
  },

  isCompleted:{
    type:Boolean
  },

  date:{
    type:String
  }

});

mongoose.model('Riderequest', RiderequestSchema);
