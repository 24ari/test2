// Rides service used to communicate Rides REST endpoints
(function () {
  'use strict';

  angular
    .module('rides')
    .factory('RidesService', RidesService);

  // RidesService.$inject = ['$resource'];

  // function RidesService($resource) {
  //   return $resource('api/rides/:rideId', {
  //     rideId: '@_id'
  //   }, {
  //     update: {
  //       method: 'PUT'
  //     }
  //   });
  // }

  RidesService.$inject = ['$http'];

  function RidesService($http){


    var methods = {
      getAll: function() {
        return $http.get('/api/students');
      },

      create: function(rides) {
        return $http.post('/api/rides', rides);
      },


      read: function(rideId){
        return $http.get('/api/rides/' + rideId);
      },

      update: function(ride, rideId) {
        return $http.put('/api/rides/' + rideId, ride);
      },

      delete: function(rideId){
        return $http.delete('/api/rides/' + rideId);
      }

    }; //closing methods

    return methods;
  }

}());
