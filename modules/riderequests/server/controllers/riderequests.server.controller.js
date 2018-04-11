'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Riderequest = mongoose.model('Riderequest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Riderequest
 */
exports.create = function(req, res) {
  var riderequest = new Riderequest(req.body);

  console.log(req.body);
  riderequest.user = req.user;
  riderequest.driverName = req.body.driverName;
  riderequest.rideId = req.body.rideId;
  riderequest.requesterId = req.body.requesterId;
  riderequest.driverId = req.body.driverId;
  riderequest.arrival = req.body.arrival;
  riderequest.departure = req.body.departure;
  riderequest.date = req.body.date;

  riderequest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(riderequest);
    }
  });
};

/**
 * Show the current Riderequest
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var riderequest = req.riderequest ? req.riderequest.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  riderequest.isCurrentUserOwner = req.user && riderequest.user && riderequest.user._id.toString() === req.user._id.toString();

  res.jsonp(riderequest);
};

/**
 * Update a Riderequest
 */
exports.update = function(req, res) {
  var riderequest = req.riderequest;

  riderequest = _.extend(riderequest, req.body);

  riderequest.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(riderequest);
    }
  });
};

/**
 * Delete an Riderequest
 */
exports.delete = function(req, res) {
  var riderequest = req.riderequest;

  riderequest.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(riderequest);
    }
  });
};

/**
 * List of Riderequests
 */
exports.list = function(req, res) {
  Riderequest.find().sort('-created').populate('user', 'displayName').exec(function(err, riderequests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(riderequests);
    }
  });
};




/**
 * Riderequest middleware
 */
exports.riderequestByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Riderequest is invalid'
    });
  }

  Riderequest.findById(id).populate('user', 'displayName').exec(function (err, riderequest) {
    if (err) {
      return next(err);
    } else if (!riderequest) {
      return res.status(404).send({
        message: 'No Riderequest with that identifier has been found'
      });
    }
    req.riderequest = riderequest;
    next();
  });
};
