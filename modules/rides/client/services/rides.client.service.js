// Rides service used to communicate Rides REST endpoints
(function () {
  'use strict';

  angular
    .module('rides')
    .factory('RidesService', RidesService);

  RidesService.$inject = ['$resource'];

  function RidesService($resource) {
    return $resource('api/rides/:rideId', {
      rideId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
