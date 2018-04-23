(function () {
  'use strict';

  // Rides controller
  angular
    .module('rides')
    .controller('RidesController', RidesController);

  RidesController.$inject = ['$scope', '$state', '$window', 'Authentication','UsersService','RidesService'];

  function RidesController ($scope, $state, $window, Authentication, UsersService,RidesService) {
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

    $scope.passengers = [];


    //$scope.rideId = $stateParams.rideId;

    $scope.elId2 = vm.authentication.user._id;

    console.log("inside ridesController");


    //get all interviewees for a volunteer registered as an interviewer
   


    // function getMentees(){
    //   var rides = $scope.rides;
    //   var passengers = [];



    //   $scope.currMentorIndex = [];
    //   for(var i = 0; i < $scope.rides.length; i++)
    //   {
    //     if($scope.students[i].mentor.includes($scope.voluser.displayName))
    //     {
    //       mentees.push($scope.students[i]);
    //       $scope.currMentorIndex.push($scope.students[i].mentor.indexOf($scope.voluser.displayName));
    //     }
    //   }
    //   $scope.mentees = mentees;
    // };




    function createRide(){
      var ride = {
        driverName: $scope.driverName,
        arrival: $scope.arrival,
        departure: $scope.departure,
        price: $scope.price,
        date: $scope.date,
        spotsAvailable: $scope.spotsAvailable
      };
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

    };


    $scope.findUser = function(driverId){
      console.log("WE ARE CALLING FINDUSER");

      UsersService.read(driverId).then(function(response){
          console.log('Success reading user');
          $scope.user1 = response.data;
          console.log($scope.user1);
          console.log("our scope is:" + $scope.user1.firstName);
      },function(error){
          console.log("unable to find user#######");
      });
    };



     $scope.getRide = function(rideId) {

      console.log("we are calling get ride!");
      //console.log("the id for get ride is:" + rideId); //ISSUE: id is undefined


      console.log("bruuuh");
      console.log("the id is:");
      console.log(rideId);
     
      var elId10 = rideId;

      var elArray=[];

      RidesService.read(elId10).then(function(response) {
        $scope.ride = response.data;
        console.log($scope.ride);
        elArray= $scope.ride.passengers;


        console.log("our array is");
        console.log(elArray);
        //console.log(response.data);

        $scope.passengers = elArray;
        console.log("success retrieving ride");

      }, function(error) {
        $scope.error = 'Unable to retrieve ride!\n' + error;
        console.log("nope");
      });
    };





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
