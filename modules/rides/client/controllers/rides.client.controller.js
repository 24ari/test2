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
    $scope.elValue = '';

    $scope.passengers = [];



    $scope.options = [
      {name:'1'},
      {name: '2'},
      {name : '3'},
      {name: '4'}
    ];


    $scope.elValue = {
        selectBoxes:{}
    };  



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



    $scope.completeRide = function(rideId){

      return new Promise(function(resolve,reject){
          console.log("we are inside promise request 1");
          console.log("the id we are trying to pass is" + rideId);

          var ride = getRide1(rideId);
          //comes back here too fast
          console.log("the ride we are returning from promise request 1 is:", ride);
          console.log(ride);
          
          resolve(ride);

    }).then(function(elRide){
      console.log("we are inside promise request 2")
        
        return new Promise(function(resolve,reject){
            var upReq = saveCompletedRide(rideId);
            console.log("retrieing upride",upReq);
            resolve(upReq);
    });

      }).then(function(newUpRequest){
            console.log("inside promise requesst 3");
            
            RidesService.update(newUpRequest,rideId).then(function(response) {
                console.log("Success updating ride!");
                console.log(response);
                //$window.location.reload();
            });
        });

    };





 function getRide1(rideId) {

  console.log("inside new function for getting ride");

      //console.log("we here");
      //var id = $stateParams.user;

      //var id = '59f7f305e58b4010fc1307f4';

    var ride;
      
    return new Promise(function(resolve,reject){

      console.log("the id for get ride is:" + rideId); //ISSUE: id is undefined

              RidesService.read(rideId).then(function(response) {
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





    function saveCompletedRide(id,user){

      console.log("In complete ride function");

        return new Promise(function(resolve,reject){
          var user1;
          user1 = getRide1(id);
          resolve(user1);
          console.log(user1);
       
        }).then(function(result){

          //console.log("the displayName is" + $scope.user.Authentication.displayName);
          // console.log("the firstName is" + $scope.user.firstName);
          // console.log("the lastName is" + $scope.user.lastName);
          //var valuesArray=[];
          //var rateValue;

          
          //console.log("elvalue2 is" + $scope.elValue2);
          //rateValue = $scope.elValue;
          //console.log("el value box is" + $scope.elValue.selectBoxes);
          //console.log("elValue is" + rateValue);
          //valuesArray = $scope.user.rate;
          //valuesArray.push(elValue);


          //console.log("elvalue2 is" + $scope.elValue2);
          //rateValue = $scope.driverRateBox;
          //console.log("el value box is" + $scope.elValue.selectBoxes);
          //console.log("elValue is" + rateValue);
          //valuesArray = $scope.user.rate;
          //valuesArray.push(rateValue);


          var use = {
            isCompleted: true,
            isCompleted:true            
            //rate: valuesArray

          }

          console.log("the ride we are returning is:");
          console.log(use);

          return use;

    });

  };




















     $scope.completeRate1 = function(driverId){

      var user;
      console.log("The id we are passing is" + driverId);


  return new Promise(function(resolve,reject){

      var user = getUser(driverId);
      console.log(user);
      resolve(user);

      console.log("coming back here");
      console.log("the usuer is:");
      console.log(user);

  }).then(function(elUser){

    return new Promise(function(resolve,reject){
        var upUser = saveUser(driverId,elUser);
        console.log("retrieving upuser", upUser);
        resolve(upUser);
  });
     
  }).then(function(newUpUser){
    console.log("in last promise");

    console.log("our newupuser is");
    console.log(newUpUser);
    console.log("our id is");
    console.log(driverId);

    var porfa;
    var vor;

    porfa = driverId;
    vor = newUpUser;

      UsersService.update(vor,porfa).then(function(response){
        console.log("Succcess up,dating user!");
        console.log(response);
      });

  });

    };












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

      console.log("the driverid we are receiving:" + driverId)

      UsersService.read(driverId).then(function(response){
          console.log('Success reading user');
          $scope.user1 = response.data;
          console.log($scope.user1);
          console.log("our scope is:" + $scope.user1.firstName);
      },function(error){
          console.log("unable to find user#######");
      });
    };


    function getUser(id){

      var user;

      return new Promise(function(resolve,reject){

        UsersService.read(id).then(function(response){
                console.log('Success reading user');
                $scope.user = response.data;
                console.log($scope.user1);
                console.log("our scope is:" + $scope.user.firstName);
                resolve(user);

            },function(error){
                console.log("unable to find user#######");
            });


      }).then(function(updatedUser){
         
        console.log("we are returning from promise");
          return updatedUser;
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
        elArray= $scope.ride.passengersArray;


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



//Fucntion for rating driveers

  $scope.submitRate1 = function(driverId){

      var user;
      console.log("The id we are passing is" + driverId);


  return new Promise(function(resolve,reject){

      var user = getUser(driverId);
      console.log(user);
      resolve(user);

      console.log("coming back here");
      console.log("the usuer is:");
      console.log(user);

  }).then(function(elUser){

    return new Promise(function(resolve,reject){
        var upUser = saveUser(driverId,elUser);
        console.log("retrieving upuser", upUser);
        resolve(upUser);
  });
     
  }).then(function(newUpUser){
    console.log("in last promise");

    console.log("our newupuser is");
    console.log(newUpUser);
    console.log("our id is");
    console.log(driverId);

    var porfa;
    var vor;

    porfa = driverId;
    vor = newUpUser;

      UsersService.update(vor,porfa).then(function(response){
        console.log("Succcess up,dating user!");
        console.log(response);
        $state.go("dashboard2");

      });

  });

    };


































//function for rating passengers
    $scope.submitRate = function(id){

      var user;
      console.log("The id we are passing is" + id);


  return new Promise(function(resolve,reject){

      var user = getUser(id);
      console.log(user);
      resolve(user);

      console.log("coming back here");
      console.log("the usuer is:");
      console.log(user);

  }).then(function(elUser){

    return new Promise(function(resolve,reject){
        var upUser = saveUser(id,elUser);
        console.log("retrieving upuser", upUser);
        resolve(upUser);
  });
     
  }).then(function(newUpUser){
    console.log("in last promise");

    console.log("our newupuser is");
    console.log(newUpUser);
    console.log("our id is");
    console.log(id);

    var porfa;
    var vor;

    porfa = id;
    vor = newUpUser;

      UsersService.update(vor,porfa).then(function(response){
        console.log("Succcess up,dating user!");
        console.log(response);
      });

  });

    };




    function saveUser(id,user){

      console.log("In saveuser function");

        return new Promise(function(resolve,reject){
          var user1;
          user1 = getUser(id);
          resolve(user1);
          console.log(user1);
       
        }).then(function(result){

          //console.log("the displayName is" + $scope.user.Authentication.displayName);
          // console.log("the firstName is" + $scope.user.firstName);
          // console.log("the lastName is" + $scope.user.lastName);
          var valuesArray=[];
          var rateValue;

          
          //console.log("elvalue2 is" + $scope.elValue2);
          //rateValue = $scope.elValue;
          //console.log("el value box is" + $scope.elValue.selectBoxes);
          //console.log("elValue is" + rateValue);
          //valuesArray = $scope.user.rate;
          //valuesArray.push(elValue);


          //console.log("elvalue2 is" + $scope.elValue2);
          rateValue = $scope.driverRateBox;
          //console.log("el value box is" + $scope.elValue.selectBoxes);
          console.log("elValue is" + rateValue);
          valuesArray = $scope.user.rate;
          valuesArray.push(rateValue);


          var use = {
            firstName : $scope.user.firstName,
            lastName: $scope.user.lastName,
            displayName: $scope.user.displayName,
            email: $scope.user.email,
            username: $scope.user.username,
            provider: $scope.user.provider,
            roles: $scope.user.roles,
            school: $scope.user.school,
            phone: $scope.user.phone,
            rate: valuesArray

          }

          console.log("the user we are returning is:");
          console.log(use);

          return use;

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
