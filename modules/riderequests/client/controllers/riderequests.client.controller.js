(function () {
  'use strict';

  // Riderequests controller
  angular
    .module('riderequests')
    .controller('RiderequestsController', RiderequestsController);

  RiderequestsController.$inject = ['$scope', '$state', '$window', 'Authentication','RiderequestsService','RidesService','$http'];

  function RiderequestsController ($scope, $state, $window, Authentication, RiderequestsService, RidesService, $http) {
    var vm = this;

    vm.authentication = Authentication;
    // vm.riderequest = riderequest;
    // vm.error = null;
    // vm.form = {};
    // vm.remove = remove;
    // vm.save = save;

    $scope.ride ='';
    $scope.user ='';
    $scope.elId = vm.authentication.user._id;



console.log("the id for the signed id user is" + vm.authentication.user._id);

    $scope.requesterId ='';
    //$scope.id = ''; //JUST ADDED THIS!!!!!!!!!!!!!!!

    console.log("calling riderequest controlla");



     $scope.listRequests = function() {

      //get all the rides, then bind it to the scope
      RiderequestsService.getAll().then(function(response) {
        $scope.riderequests = response.data;
        console.log(response.data);
        console.log("we retrieved requests!");
      }, function(error) {
        $scope.error = "Unable to retrieve ride offers! \n" + error;
      });
    };


    function createRideRequest(){
      var unId;
      console.log("the rideId is:" + $scope.ride._id);
      console.log("the authentication id is:" + Authentication.user._id);
      var requesterId;

      requesterId= Authentication.user._id;


      console.log("the requesterid is" + requesterId);

      unId = $scope.ride._id;

      var request = {


          rideId : unId,
          driverName: $scope.ride.driverName,
          driverId: $scope.ride.user._id,
          requesterId: requesterId,
          arrival: $scope.ride.arrival,
          departure: $scope.ride.departure,
          date: $scope.ride.date
      }
        return request;
    }





 $scope.getRide = function(id) {

      //console.log("we here");
      //var id = $stateParams.user;

      //var id = '59f7f305e58b4010fc1307f4';

      console.log("we are calling get ride!");
      console.log("the id for get ride is:" + id); //ISSUE: id is undefined
      RidesService.read(id).then(function(response) {
        $scope.ride = response.data;
        console.log($scope.ride);
        //console.log(response.data);
        console.log("or are we here?");
      }, function(error) {
        $scope.error = 'Unable to retrieve ride!\n' + error;
        console.log("nope");
      });
    };


     $scope.getUser = function(driverId) {

      //console.log("we here");
      //var id = $stateParams.user;

      //var id = '59f7f305e58b4010fc1307f4';

      console.log("we are calling get User!");
      console.log(driverId); //ISSUE: id is undefined
      UsersService.read(driverId).then(function(response) {
        $scope.user = response.data;
        console.log($scope.user);
        //console.log(response.data);
        console.log("or are we here?");
      }, function(error) {
        $scope.error = 'Unable to retrieve user!\n' + error;
        console.log("nope");
      });
    };






      $scope.saveRequest = function(){ //function to save ride
      var request = createRideRequest(); //passing ride info

      RiderequestsService.create(request).then(function(response){
          console.log('Success creating request!');
         // Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Request sent!' });
        },function(error){
          $scope.error = 'Unable to create request!\n' +error;
        
        });
    };



      $scope.removeRequest = function(id){ //function to delete riderequest
      //var request = createRideRequest(); //passing ride info

      console.log("we are trying to delete request");
      console.log("the id is:" + id);

      RiderequestsService.delete(id).then(function(response){
          console.log('Success deleting request!');
          $state.reload();
         // Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Request sent!' });
        },function(error){
          $scope.error = 'Unable to delete request!\n' +error;
        
        });
    };


    $scope.acceptRequest =function(rideId){


      console.log("we are trying to update ride");
      //console.log("the id is:" + id);

      
    var elRide;
    var elId;
    var elRide2;


    RidesService.read(rideId).then(function(response) {
        elRide = response.data;
        console.log("lo que obtuvismo del ride es: " + elRide);
        elRide.arrival = "Donde quieras papoide";
        elId = elRide._id; 
        console.log("y nuestro id es: " + elId);


        $scope.updateRide(rideId);

        //console.log(response.data);
        console.log("or are we here?");
      }, function(error) {
        $scope.error = 'Unable to retrieve ride!\n' + error;
        console.log("nope");
      });

};

    
  
  $scope.updateRide = function(id) {

    

      RidesService.update(rideId).then(function(response) {
        elRide = response.data;
        console.log("lo que obtuvismo del ride es: " + elRide);
        elRide.arrival = "Donde quieras papoide";
        elId = elRide._id; 
        console.log("y nuestro id es: " + elId);


        $scope.updateRide(rideId);

        //console.log(response.data);
        console.log("or are we here?");
      }, function(error) {
        $scope.error = 'Unable to retrieve ride!\n' + error;
        console.log("nope");
      });

};


  };







    // // Remove existing Riderequest
    // $scope.remove = function () {
    //   console.log("we are trying to remove");
    //   if ($window.confirm('Are you sure you want to delete?')) {
    //     vm.riderequest.$remove($state.go('riderequests.list'));
    //   }
    // }

    // Save Riderequest
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.riderequestForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.riderequest._id) {
        vm.riderequest.$update(successCallback, errorCallback);
      } else {
        vm.riderequest.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('riderequests.view', {
          riderequestId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
