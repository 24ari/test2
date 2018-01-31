(function () {
  'use strict';

  // Rides controller
  angular
    .module('rides')
    .controller('RidesController', RidesController);

  RidesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'rideResolve'];

  function RidesController ($scope, $state, $window, Authentication, ride) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ride = ride;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ride
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ride.$remove($state.go('rides.list'));
      }
    }

    // Save Ride
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.rideForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ride._id) {
        vm.ride.$update(successCallback, errorCallback);
      } else {
        vm.ride.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('rides.view', {
          rideId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
