// Riderequests service used to communicate Riderequests REST endpoints
(function () {
  'use strict';

  angular
    .module('riderequests')
    .factory('RiderequestsService', RiderequestsService);

  // RiderequestsService.$inject = ['$resource'];

//   function RiderequestsService($resource) {
//     return $resource('api/riderequests/:riderequestId', {
//       riderequestId: '@_id'
//     }, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// }());

  RiderequestsService.$inject = ['$http'];

  function RiderequestsService($http){


    var methods = {
      getAll: function() {
          return $http.get('/api/riderequests');
      },

      create: function(riderequests) {
          return $http.post('/api/riderequests', riderequests);
      },


      read: function(riderequests){
          return $http.get('/api/riderequests/' +  rideId); //IMPORTANT!!!
      },

      update: function(riderequests, rideId) { //change rideId
        return $http.put('/api/riderequests/' + rideId, riderequests);
      },

      delete: function(rideId){
        return $http.delete('/api/rides/' + rideId);
      }

     }; //closing methods

       return methods;
    }

}());