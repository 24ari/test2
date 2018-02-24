(function () {
  'use strict';

  angular
    .module('rides')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rides', {
        abstract: true,
        url: '/rides',
        templateUrl: 'modules/rides/client/views/form-ride.client.view.html'
      })
      .state('rides.list', {
        url: '',
        templateUrl: 'modules/rides/client/views/list-rides.client.view.html',
        controller: 'RidesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rides List'
        }
      })
      .state('rides.create', {
        url: '/create',
        templateUrl: 'modules/rides/client/views/postride.client.view.html',
        controller: 'RidesController',
        controllerAs: 'vm',
        resolve: {
          rideResolve: newRide
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Rides Create'
        }
      })
      .state('rides.edit', {
        url: '/:rideId/edit',
        templateUrl: 'modules/rides/client/views/form-ride.client.view.html',
        controller: 'RidesController',
        controllerAs: 'vm',
        resolve: {
          rideResolve: getRide
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ride {{ rideResolve.name }}'
        }
      })
      .state('rides.view', {
        url: '/:rideId',
        templateUrl: 'modules/rides/client/views/view-ride.client.view.html',
        controller: 'RidesController',
        controllerAs: 'vm',
        resolve: {
          rideResolve: getRide
        },
        data: {
          pageTitle: 'Ride {{ rideResolve.name }}'
        }
      });
  }

  getRide.$inject = ['$stateParams', 'RidesService'];

  function getRide($stateParams, RidesService) {
    return RidesService.get({
      rideId: $stateParams.rideId
    }).$promise;
  }

  newRide.$inject = ['RidesService'];

  function newRide(RidesService) {
    return new RidesService();
  }
}());
