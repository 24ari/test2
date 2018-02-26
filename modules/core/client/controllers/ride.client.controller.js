(function() {
  'use strict';

  // Students controller
  angular
    .module('students')
    .controller('StudentsController', StudentsController);

  StudentsController.$inject = ['$scope', '$window', 'StudentsService', 'Authentication', 'googleDriveService', 'Notification'];

  function StudentsController($scope, $window, StudentsService, Authentication, googleDriveService, Notification) {


    $scope.userid = Authentication.user._id;
    $scope.student_classes = [];
    $scope.student_projects = [];
    $scope.student_clubs = [];
    $scope.student_proExperience = [];
    $scope.student_volExperience = [];
    $scope.student_locationChoice = [];
    $scope.student_Forms = [];
    $scope.student_timeSlots = [];
    $scope.student_acceptedTimeSlot = [];
    $scope.student_interests = [];
    $scope.student_mentor = '';
    $scope.app_name = '';
    $scope.app_email = '';
    $scope.app_phone = '';
    $scope.app_address = '';
    $scope.app_school = '';
    $scope.app_school_grade = '';
    $scope.parent_name = '';
    $scope.parent_email = '';
    $scope.app_session1 = '';
    $scope.app_session2 = '';
    $scope.app_session3 = '';
    $scope.student_interview_rank = [];



  }

}());
