(function () {
  'use strict';

  describe('Riderequests Route Tests', function () {
    // Initialize global variables
    var $scope,
      RiderequestsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RiderequestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RiderequestsService = _RiderequestsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('riderequests');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/riderequests');
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
          RiderequestsController,
          mockRiderequest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('riderequests.view');
          $templateCache.put('modules/riderequests/client/views/view-riderequest.client.view.html', '');

          // create mock Riderequest
          mockRiderequest = new RiderequestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Riderequest Name'
          });

          // Initialize Controller
          RiderequestsController = $controller('RiderequestsController as vm', {
            $scope: $scope,
            riderequestResolve: mockRiderequest
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:riderequestId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.riderequestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            riderequestId: 1
          })).toEqual('/riderequests/1');
        }));

        it('should attach an Riderequest to the controller scope', function () {
          expect($scope.vm.riderequest._id).toBe(mockRiderequest._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/riderequests/client/views/view-riderequest.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RiderequestsController,
          mockRiderequest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('riderequests.create');
          $templateCache.put('modules/riderequests/client/views/form-riderequest.client.view.html', '');

          // create mock Riderequest
          mockRiderequest = new RiderequestsService();

          // Initialize Controller
          RiderequestsController = $controller('RiderequestsController as vm', {
            $scope: $scope,
            riderequestResolve: mockRiderequest
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.riderequestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/riderequests/create');
        }));

        it('should attach an Riderequest to the controller scope', function () {
          expect($scope.vm.riderequest._id).toBe(mockRiderequest._id);
          expect($scope.vm.riderequest._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/riderequests/client/views/form-riderequest.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RiderequestsController,
          mockRiderequest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('riderequests.edit');
          $templateCache.put('modules/riderequests/client/views/form-riderequest.client.view.html', '');

          // create mock Riderequest
          mockRiderequest = new RiderequestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Riderequest Name'
          });

          // Initialize Controller
          RiderequestsController = $controller('RiderequestsController as vm', {
            $scope: $scope,
            riderequestResolve: mockRiderequest
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:riderequestId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.riderequestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            riderequestId: 1
          })).toEqual('/riderequests/1/edit');
        }));

        it('should attach an Riderequest to the controller scope', function () {
          expect($scope.vm.riderequest._id).toBe(mockRiderequest._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/riderequests/client/views/form-riderequest.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
