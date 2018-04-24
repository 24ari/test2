'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })


      .state('profiles', {
        url: '/profiles',
        templateUrl: 'modules/users/client/views/user-profile.client.view.html'
        
        // resolve: {
        //   userResolve: ['$stateParams', 'User', function ($stateParams, User) {
        //     return User.get({
        //       userId: $stateParams.userId
        //     });
        //   }]
        // }
      })


    .state('rideinfo', { //come back to this later!!
        url: '/rideinfo/:rideId/:driverId',
        templateUrl: 'modules/users/client/views/rideinfo.html',
        controller: function($scope,$stateParams){
          $scope.id = $stateParams.rideId;
          $scope.driverId = $stateParams.driverId;
          console.log("ride id is " + $stateParams.rideId + "driverId is" + $stateParams.driverId);
      }

      })


     .state('passengerrate', { 
        url: '/passengerrate/:rideId',
        templateUrl: 'modules/users/client/views/user-rate.client.view.html',
        controller: function($scope,$stateParams){
          $scope.rideId = $stateParams.rideId;
          console.log("ride id is " + $stateParams.rideId);
      }

      })


      .state('driverrate', { 
        url: '/driverrate/:driverId',
        templateUrl: 'modules/users/client/views/driver-rate.client.view.html',
        controller: function($scope,$stateParams){
          $scope.driverId = $stateParams.driverId;
          console.log("driver id is " + $stateParams.driverId);
      }

      })


       .state('viewrequest', { 
        url: '/viewrequest/:rideId',
        templateUrl: 'modules/users/client/views/view-requests.client.view.html',
        controller: function($scope,$stateParams){
          $scope.rideId = $stateParams.rideId;
          console.log("request id is " + $stateParams.rideId);
      }

      })


        .state('viewpassenger', { 
        url: '/viewpassenger/:passengerId',
        templateUrl: 'modules/users/client/views/view-passenger.client.view.html',
        controller: function($scope,$stateParams){
          $scope.passengerId = $stateParams.passengerId;
          console.log("request id is " + $stateParams.passengerId);
      }

      })


    .state('dashboard1', { //come back to this later!!
        url: '/dashboard1',
        templateUrl: 'modules/users/client/views/user-dashboard.client.view.html'
      })


    .state('dashboard2', {
         url: '/dashboard2',
        templateUrl: 'modules/users/client/views/user-dashboard-passenger.client.view.html'
      })


      // .state('settings.profile', { //come back to this later!!
      //   url: '/profile',
      //   templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      // })

    .state('settings.profile', { //come back to this later!!
        url: '/profile',
        templateUrl: 'modules/users/client/views/user-profile.client.view.html'
      })




      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      });
  }
]);
