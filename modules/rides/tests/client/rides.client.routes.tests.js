(function () {
  'use strict';

  describe('Rides Route Tests', function () {
    // Initialize global variables
    var $scope,
      RidesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RidesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RidesService = _RidesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('rides');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/rides');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          RidesController,
          mockRide;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('rides.view');
          $templateCache.put('modules/rides/client/views/view-ride.client.view.html', '');

          // create mock Ride
          mockRide = new RidesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ride Name'
          });

          // Initialize Controller
          RidesController = $controller('RidesController as vm', {
            $scope: $scope,
            rideResolve: mockRide
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:rideId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.rideResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            rideId: 1
          })).toEqual('/rides/1');
        }));

        it('should attach an Ride to the controller scope', function () {
          expect($scope.vm.ride._id).toBe(mockRide._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/rides/client/views/view-ride.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RidesController,
          mockRide;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('rides.create');
          $templateCache.put('modules/rides/client/views/form-ride.client.view.html', '');

          // create mock Ride
          mockRide = new RidesService();

          // Initialize Controller
          RidesController = $controller('RidesController as vm', {
            $scope: $scope,
            rideResolve: mockRide
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.rideResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/rides/create');
        }));

        it('should attach an Ride to the controller scope', function () {
          expect($scope.vm.ride._id).toBe(mockRide._id);
          expect($scope.vm.ride._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/rides/client/views/form-ride.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RidesController,
          mockRide;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('rides.edit');
          $templateCache.put('modules/rides/client/views/form-ride.client.view.html', '');

          // create mock Ride
          mockRide = new RidesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ride Name'
          });

          // Initialize Controller
          RidesController = $controller('RidesController as vm', {
            $scope: $scope,
            rideResolve: mockRide
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:rideId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.rideResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            rideId: 1
          })).toEqual('/rides/1/edit');
        }));

        it('should attach an Ride to the controller scope', function () {
          expect($scope.vm.ride._id).toBe(mockRide._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/rides/client/views/form-ride.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
