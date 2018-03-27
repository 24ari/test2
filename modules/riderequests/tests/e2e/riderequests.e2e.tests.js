'use strict';

describe('Riderequests E2E Tests:', function () {
  describe('Test Riderequests page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/riderequests');
      expect(element.all(by.repeater('riderequest in riderequests')).count()).toEqual(0);
    });
  });
});
