'use strict';

/**
 * Module dependencies
 */
var ridesPolicy = require('../policies/rides.server.policy'),
  rides = require('../controllers/rides.server.controller');

module.exports = function(app) {
  // Rides Routes
  app.route('/api/rides').all(ridesPolicy.isAllowed)
    .get(rides.list)
    .post(rides.create);

  app.route('/api/rides/:rideId').all(ridesPolicy.isAllowed)
    .get(rides.read)
    .put(rides.update)
    .delete(rides.delete);

  // Finish by binding the Ride middleware
  app.param('rideId', rides.rideByID);
};
