'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'modules/rides/client/views/dashboard.client.view.html'
    })

      .state('user-profile', {
      url: '/user-profile',
      templateUrl: 'modules/users/client/views/user-profile.client.view.html'
    })
    

    .state('post-ride', {
      url: '/post-ride',
      templateUrl: 'modules/rides/client/views/postride.client.view.html'
    })

    .state('driver-profile', {
      url: '/driver-profile/:driverId',
      templateUrl: 'modules/core/client/views/profile.client.view.html',
      controller: function($scope,$stateParams){
          $scope.id = $stateParams.rideId;
      }
    })


    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
