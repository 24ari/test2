'use strict';

describe('Rides E2E Tests:', function () {
  describe('Test Rides page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/rides');
      expect(element.all(by.repeater('ride in rides')).count()).toEqual(0);
    });
  });
});
