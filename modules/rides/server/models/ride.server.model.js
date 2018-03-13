'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ride Schema
 */
var RideSchema = new Schema({
  // name: {
  //   type: String,
  //   default: '',
  //   required: 'Please fill Ride name',
  //   trim: true
  // },
  // created: {
  //   type: Date,
  //   default: Date.now
  // },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  date: {
    type:String
  },
  price: {
    type: String
  },
  departure:{
    type:String
  },
  arrival:{
    type:String
  },
  spotsLeft:{
    type:String
  },

  canPickUp:{
    type:Boolean
  }
});

mongoose.model('Ride', RideSchema);

