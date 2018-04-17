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


      read: function(riderequestsId){
          return $http.get('/api/riderequests/' +  riderequestsId); //IMPORTANT!!!
      },

      update: function(riderequests, riderequestsId) { //change rideId
        return $http.put('/api/riderequests/' + riderequestsId, riderequests);
      },

      delete: function(riderequestId){
        return $http.delete('/api/riderequests/' + riderequestId);
      }

     }; //closing methods

       return methods;
    }

}());