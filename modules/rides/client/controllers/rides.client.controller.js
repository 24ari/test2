(function () {
  'use strict';

  // Rides controller
  angular
    .module('rides')
    .controller('RidesController', RidesController);

  RidesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'RidesService'];

  function RidesController ($scope, $state, $window, Authentication, RidesService,ride) {
    var vm = this;

     vm.authentication = Authentication;
    // vm.ride = ride;
    // vm.error = null;
    // vm.form = {};
    // vm.remove = remove;
    // vm.save = save;


    $scope.driverName = vm.authentication.user.displayName;
    $scope.arrival = ''; 
    $scope.departure = '';
    $scope.price = '';
    $scope.date = '';
    $scope.spotsLeft ='';
    $scope.spotsAvailable ='';


    $scope.elId2 = vm.authentication.user._id;

    console.log("inside ridesController");

    function createRide(){
      var ride = {
        driverName: $scope.driverName,
        arrival: $scope.arrival,
        departure: $scope.departure,
        price: $scope.price,
        date: $scope.date,
        spotsAvailable: $scope.spotsAvailable
      }
        return ride;
    }


    $scope.checkAut = function(){

      console.log("checking authentication");
      if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
          $state.go('post-ride');
        } else {
          $state.go('authentication.signin').then(function () {
            storePreviousState(toState, toParams);
          });
        }

    }


    $scope.saveRide = function(){ //function to save ride
      var rides = createRide(); //passing ride info

      RidesService.create(rides).then(function(response){
          console.log('Success creating ride!');
          // Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Ride offer posted!' });
        },function(error){
          $scope.error = 'Unable to create ride!\n' +error;

        });
    };


     $scope.listRides = function() {

      //get all the rides, then bind it to the scope
      RidesService.getAll().then(function(response) {
        $scope.rides = response.data;
        console.log(response.data);
      }, function(error) {
        $scope.error = "Unable to retrieve ride offers! \n" + error;
      });
    };


    // Remove existing Ride
    // function remove() {
    //   if ($window.confirm('Are you sure you want to delete?')) {
    //     vm.ride.$remove($state.go('rides.list'));
    //   }
    // }

    // // Save Ride
    // function save(isValid) {
    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'vm.form.rideForm');
    //     return false;
    //   }

    //   // TODO: move create/update logic to service
    //   if (vm.ride._id) {
    //     vm.ride.$update(successCallback, errorCallback);
    //   } else {
    //     vm.ride.$save(successCallback, errorCallback);
    //   }

    //   function successCallback(res) {
    //     $state.go('rides.view', {
    //       rideId: res._id
    //     });
    //   }

    //   function errorCallback(res) {
    //     vm.error = res.data.message;
    //   }
    // }

  }

}());
