(function () {
  'use strict';

  // Riderequests controller
  angular
    .module('riderequests')
    .controller('RiderequestsController', RiderequestsController);

  RiderequestsController.$inject = ['$scope', '$state', '$window', 'Authentication','RiderequestsService','RidesService','UsersService','$http'];

  function RiderequestsController ($scope, $state, $window, Authentication, RiderequestsService, RidesService, UsersService,$http) {
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





    $scope.completeRequest = function(requestId){  //FUNCTION TO UPDATE REQUEST

        return new Promise(function(resolve,reject){
          console.log("we are inside promise request 1");
          
          var request = getRequest1(requestId);
          //comes back here too fast
          console.log("the ride we are returning from promise request 1 is:", request);
          console.log(request);
          
          resolve(request);

    }).then(function(elReq){
      console.log("we are inside promise request 2")
        
        return new Promise(function(resolve,reject){
            var upReq = saveCompletedRequest(requestId);
            console.log("retrieing upride",upReq);
            resolve(upReq);
    });

      }).then(function(newUpRequest){
            console.log("inside promise requesst 3");
            
            RiderequestsService.update(newUpRequest,requestId).then(function(response) {
                console.log("Success updating request!");
                console.log(response);
                //$window.location.reload();
            });
        }); 
    };
 



function saveCompletedRequest(id){

return new Promise(function(resolve,reject){
    console.log("Inside saveRequest promise"); 
    var request;

    console.log("the id we are trying to pass is:" + id);

    request = getRequest1(id);
    
     console.log("the request is:::::");
     
    //ride = getRide1(id);

     resolve(request);
     console.log("Getting out of readinG request in save request of promise 2");
     console.log(request);

}).then(function(result){

  console.log("the scope arrival is" + $scope.request.arrival);


    var request = {
        isCompleted : true,
        isCompleted: true
    }

  console.log(" the request we are returning form saveRide in promise 2is:");
  console.log(request);

return request;
// });   
  });

};


















    $scope.averageRate = function(driverId){


      console.log("calling averageRate");

      var sum = 0;
      var rates = [];


      console.log("id we are passing inside averagerate is:" + driverId);

      UsersService.read(driverId).then(function(response) {
        $scope.user = response.data;
        console.log($scope.user);

      console.log("user rate is " + $scope.user.rate);
      rates = $scope.user.rate;

      for(var i =0; i < rates.length; i++){
          sum += parseInt(rates[i],10);
      }

      var avg = sum / rates.length;

      console.log("our average is" + avg);

      $scope.rateAverage = avg;


      }, function(error) {
        $scope.error = 'Unable to retrieve ride!\n' + error;
        console.log("nope");
      });


    };



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
      var requesterName;

      requesterId= Authentication.user._id;
      requesterName = Authentication.user.displayName;

      console.log("the requesterid is" + requesterId);

      console.log("the requesterName is" + requesterName);

      unId = $scope.ride._id;

      var request = {

          rideId : unId,
          driverName: $scope.ride.driverName,
          driverId: $scope.ride.user._id,
          requesterId: requesterId,
          requesterName: requesterName,
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
        console.log("or are we here calling old function?");
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



// // old ACCEPTREQUEST FUNCTION
//     $scope.acceptRequest =function(rideId){


//       console.log("we are trying to update ride");
//       //console.log("the id is:" + id);

      
//     var elRide;
//     var elId;
//     var elRide2;


//     RidesService.read(rideId).then(function(response) {
//         elRide = response.data;
//         console.log("lo que obtuvismo del ride es: " + elRide);
//         elRide.arrival = "Donde quieras papoide";
//         elId = elRide._id; 
//         console.log("y nuestro id es: " + elId);


//         $scope.updateRide(rideId);

//         //console.log(response.data);
//         console.log("or are we here?");
//       }, function(error) {
//         $scope.error = 'Unable to retrieve ride!\n' + error;
//         console.log("nope");
//       });

// };



    
function saveRide(id,requestId){

return new Promise(function(resolve,reject){
    console.log("Inside saveRide promise");
    // var ride = getRide1(id);
    // console.log("the ride we are reading is:" );
    // //WE ARE NOT RETURNING RIDE IN TIME
    // console.log(ride);
    // resolve(ride);   
    // console.log("Or the ride is>>>");
    // console.log(ride);


    var ride;

    console.log("the id we are trying to pass is:" + id);


    ride = getRide1(id);
    
     console.log("the ride is:::::");
     
    //ride = getRide1(id);

     resolve(ride);
     console.log("Getting out of readinG rIDE in save ride of promise 2");
     console.log(ride);

}).then(function(result){

  console.log("the scope arrival is" + $scope.ride.arrival);

  var decreaseSpot;
  var spotsAva;


  spotsAva = $scope.ride.spotsAvailable;
  console.log("the scope shows:" + $scope.ride.spotsAvailable);
  console.log(" spots available are: " + spotsAva);

  decreaseSpot = spotsAva - 1;

  console.log("spot number is" + decreaseSpot);

  //var passengers = $scope.ride.passengers;
  var passengerObj = $scope.ride.passengersArray;



  console.log("the Scope is" + $scope.request);
  //works for single array,uncomment if last resource
  // passengers.push($scope.request.requesterId);


  var passengerVar = {"id" : $scope.request.requesterId,
                       "name": $scope.request.requesterName};


  passengerObj.push(passengerVar);

  console.log("our passengerObj is" + passengerObj);

    var ride = {
        arrival: $scope.ride.arrival,
        spotsAvailable: decreaseSpot,
        price: $scope.ride.arrival,
        //passengers: passengers
        passengersArray: passengerObj
    }
  console.log(" the ride we are returning form saveRide in promise 2is:");
  console.log(ride);

return ride;
// });   
  });

};


 function getRide1(id) {

  console.log("inside new function for getting ride");

      //console.log("we here");
      //var id = $stateParams.user;

      //var id = '59f7f305e58b4010fc1307f4';

    var ride;
      
    return new Promise(function(resolve,reject){

      console.log("the id for get ride is:" + id); //ISSUE: id is undefined

              RidesService.read(id).then(function(response) {
                $scope.ride = response.data;
                ride = response.data;
                console.log("the ride we are about to pass to scope is:");
                console.log($scope.ride);
                //console.log(response.data);
                resolve(ride);


                console.log("or are we here dasdadadasd?");
              }, function(error) {
                $scope.error = 'Unable to retrieve ride!\n' + error;
                console.log("nope");
              });  
  
          //resolve(ride);
  }).then(function(updatedRide){
      return updatedRide;
   });
  };


  
  $scope.updateRide = function(rideId,requestId) { //pass requester info here!!

    return new Promise(function(resolve,reject){
          console.log("we are inside promise 1");
          
          var ride = getRide1(rideId);
          console.log("the ride we are returning from promise 1 is:", ride);
          console.log(ride);
          
          resolve(ride);

    }).then(function(elRid){
      console.log("we are inside promise 2")
        
        return new Promise(function(resolve,reject){
            var upRide = saveRide(rideId,requestId);
            console.log("retrieving upride",upRide);
            resolve(upRide); //wth
    });

      }).then(function(newUpRide){
            console.log("inside promise 3");
            
            RidesService.update(newUpRide,rideId).then(function(response) {
                console.log("Success updating ride!");
                console.log(response);
                $state.go('dashboard1');
                //$window.location.reload();
            });

        }); 
    };



    $scope.updateRequest = function(requestId){  //FUNCTION TO UPDATE REQUEST

        return new Promise(function(resolve,reject){
          console.log("we are inside promise request 1");
          
          var request = getRequest1(requestId);
          //comes back here too fast
          console.log("the ride we are returning from promise request 1 is:", request);
          console.log(request);
          
          resolve(request);

    }).then(function(elReq){
      console.log("we are inside promise request 2")
        
        return new Promise(function(resolve,reject){
            var upReq = saveRequest(requestId);
            console.log("retrieing upride",upReq);
            resolve(upReq);
    });

      }).then(function(newUpRequest){
            console.log("inside promise requesst 3");
            
            RiderequestsService.update(newUpRequest,requestId).then(function(response) {
                console.log("Success updating request!");
                console.log(response);
                //$window.location.reload();
            });
        }); 
    };



 function getRequest1(id) {

  console.log("inside new function for getting request");

      //console.log("we here");
      //var id = $stateParams.user;

      //var id = '59f7f305e58b4010fc1307f4';

    var request;
      
    return new Promise(function(resolve,reject){

      console.log("the id for get request is:" + id); //ISSUE: id is undefined

              RiderequestsService.read(id).then(function(response) {
                $scope.request = response.data;
                request = response.data;
                console.log("the request we are about to pass to scope is:");
                console.log($scope.request);
                //console.log(response.data);
                resolve(request);
                console.log("or are we here dasdadadasd?");
              }, function(error) {
                $scope.error = 'Unable to retrieve request!\n' + error;
                console.log("nope");
              });  
  
          //resolve(ride);
  }).then(function(updatedRequest){
      return updatedRequest;
   });
  };


  


    
function saveRequest(id){

return new Promise(function(resolve,reject){
    console.log("Inside saveRequest promise"); 
    var request;

    console.log("the id we are trying to pass is:" + id);

    request = getRequest1(id);
    
     console.log("the request is:::::");
     
    //ride = getRide1(id);

     resolve(request);
     console.log("Getting out of readinG request in save request of promise 2");
     console.log(request);

}).then(function(result){

  console.log("the scope arrival is" + $scope.request.arrival);


    var request = {
        status : "accepted",
        status : "accepted",
        isAccepted: true,
    }

  console.log(" the request we are returning form saveRide in promise 2is:");
  console.log(request);

return request;
// });   
  });

};

//       var ride = saveRide(id);

//       RidesService.update(ride,id).then(function(response) {
//         //elRide = response.data;
//         //console.log("lo que obtuvismo del ride es: " + elRide);
//         //elRide.arrival = "Donde quieras papoide";
//         //elId = elRide._id; 
//         //console.log("y nuestro id es: " + elId);


//         //$scope.updateRide(rideId);

//         //console.log(response.data);
        
//         //alert('Save successful!'); UNCOMMENT LATER!

//         console.log("Succes updating ride!");
//       }, function(error) {
//         $scope.error = 'Unable to retrieve ride!\n' + error;
//         console.log("nope");
//       });

// };


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