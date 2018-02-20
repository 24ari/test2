(function () {
  'use strict';

  angular
    .module('rides')
    .controller('RidesListController', RidesListController);

  RidesListController.$inject = ['RidesService'];

  function RidesListController(RidesService) {
    var vm = this;

    vm.rides = RidesService.query();
  }
}());
