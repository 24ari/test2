'use strict';

/**
 * Module dependencies
 */
var riderequestsPolicy = require('../policies/riderequests.server.policy'),
  riderequests = require('../controllers/riderequests.server.controller');

module.exports = function(app) {
  // Riderequests Routes
  app.route('/api/riderequests').all(riderequestsPolicy.isAllowed)
    .get(riderequests.list)
    .post(riderequests.create);

  app.route('/api/riderequests/:riderequestId').all(riderequestsPolicy.isAllowed)
    .get(riderequests.read)
    .put(riderequests.update)
    .delete(riderequests.delete);

  // Finish by binding the Riderequest middleware
  app.param('riderequestId', riderequests.riderequestByID);
};
