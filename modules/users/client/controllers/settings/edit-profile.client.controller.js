'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;


    console.log('we are inside editprofile');

    // Update a user profile
    //$scope.updateUserProfile = function (isValid) {
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;


      // if (!isValid) {
      //   $scope.$broadcast('show-errors-check-validity', 'userForm');

      //   return false;
      // }

      var user = new Users($scope.user);

      console.log('we here');

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        console.log('we are successful!');
        Authentication.user = response;
      }, function (response) {
        console.log('error');
        $scope.error = response.data.message;
      });
    };
  }
]);
