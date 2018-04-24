//'use strict';

// // Users service used for communicating with the users REST endpoint
// angular.module('users').factory('Users', ['$resource',
//   function ($resource) {
//     return $resource('api/users', {}, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// ]);

// //TODO this should be Users service
// angular.module('users.admin').factory('Admin', ['$resource',
//   function ($resource) {
//     return $resource('api/users/:userId', {
//       userId: '@_id'
//     }, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// ]);


// // Rides service used to communicate Rides REST endpoints
(function () {
  'use strict';

  angular
    .module('users')
    .factory('UsersService', UsersService);

//   // RidesService.$inject = ['$resource'];

//   // function RidesService($resource) {
//   //   return $resource('api/rides/:rideId', {
//   //     rideId: '@_id'
//   //   }, {
//   //     update: {
//   //       method: 'PUT'
//   //     }
//   //   });
//   // }

  UsersService.$inject = ['$http'];

  function UsersService($http){


    var methods = {
      getAll: function() {
          return $http.get('/api/users');
      },

      create: function(users) {
          return $http.post('/api/users', users);
      },


      read: function(userId){
          return $http.get('/api/users/' +  userId);
      },

      update: function(users,userId) {
        return $http.put('/api/users/' + userId,users);
      },

      delete: function(userId){
        return $http.delete('/api/users/' + userId);
      }

     }; //closing methods

       return methods;
    }

}());


