(function () {
  'use strict';

  angular
    .module('riderequests')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('riderequests', {
        abstract: true,
        url: '/riderequests',
        template: '<ui-view/>'
      })
      .state('riderequests.list', {
        url: '',
        templateUrl: 'modules/riderequests/client/views/list-riderequests.client.view.html',
        controller: 'RiderequestsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Riderequests List'
        }
      })
      .state('riderequests.create', {
        url: '/create',
        templateUrl: 'modules/riderequests/client/views/form-riderequest.client.view.html',
        controller: 'RiderequestsController',
        controllerAs: 'vm',
        resolve: {
          riderequestResolve: newRiderequest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Riderequests Create'
        }
      })
      .state('riderequests.edit', {
        url: '/:riderequestId/edit',
        templateUrl: 'modules/riderequests/client/views/form-riderequest.client.view.html',
        controller: 'RiderequestsController',
        controllerAs: 'vm',
        resolve: {
          riderequestResolve: getRiderequest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Riderequest {{ riderequestResolve.name }}'
        }
      })
      .state('riderequests.view', {
        url: '/:riderequestId',
        templateUrl: 'modules/riderequests/client/views/view-riderequest.client.view.html',
        controller: 'RiderequestsController',
        controllerAs: 'vm',
        resolve: {
          riderequestResolve: getRiderequest
        },
        data: {
          pageTitle: 'Riderequest {{ riderequestResolve.name }}'
        }
      });
  }

  getRiderequest.$inject = ['$stateParams', 'RiderequestsService'];

  function getRiderequest($stateParams, RiderequestsService) {
    return RiderequestsService.get({
      riderequestId: $stateParams.riderequestId
    }).$promise;
  }

  newRiderequest.$inject = ['RiderequestsService'];

  function newRiderequest(RiderequestsService) {
    return new RiderequestsService();
  }
}());
