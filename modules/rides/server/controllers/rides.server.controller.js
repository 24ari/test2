'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ride = mongoose.model('Ride'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ride
 */
exports.create = function(req, res) {
  var ride = new Ride(req.body);
  //ride.user = req.user;
  console.log(req.body);
  ride.user = req.user; //not displaying user
  ride.arrival = req.body.arrival;
  ride.departure = req.body.departure;
  ride.date = req.body.date;
  ride.price = req.body.price;

  console.log("at least we got here");
  ride.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ride);
      //console.log('lol' + res.jsonp(ride));
    }
  });
};

/**
 * Show the current Ride
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ride = req.ride ? req.ride.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ride.isCurrentUserOwner = req.user && ride.user && ride.user._id.toString() === req.user._id.toString();

  res.jsonp(ride);
};

/**
 * Update a Ride
 */
exports.update = function(req, res) {
  var ride = req.ride;

  ride = _.extend(ride, req.body);

  ride.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ride);
    }
  });
};

/**
 * Delete an Ride
 */
exports.delete = function(req, res) {
  var ride = req.ride;

  ride.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ride);
    }
  });
};

/**
 * List of Rides
 */
exports.list = function(req, res) {
  Ride.find().sort('-created').populate('user', 'displayName').exec(function(err, rides) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rides);
    }
  });
};

/**
 * Ride middleware
 */
exports.rideByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ride is invalid'
    });
  }

  Ride.findById(id).populate('user', 'displayName').exec(function (err, ride) {
    if (err) {
      return next(err);
    } else if (!ride) {
      return res.status(404).send({
        message: 'No Ride with that identifier has been found'
      });
    }
    req.ride = ride;
    next();
  });
};
