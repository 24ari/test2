(function () {
  'use strict';

  angular
    .module('riderequests')
    .controller('RiderequestsListController', RiderequestsListController);

  RiderequestsListController.$inject = ['RiderequestsService'];

  function RiderequestsListController(RiderequestsService) {
    var vm = this;

    vm.riderequests = RiderequestsService.query();
  }
}());
