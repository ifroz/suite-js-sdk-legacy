'use strict';

var expect = require('chai').expect;
var ProgramResourceApi = require('./');

describe('Suite Program Resources', function() {

  it('creates a program resource', function() {

    var api = ProgramResourceApi.create({
      get: function(customerId, url, payload) {
        expect(url).to.equal('/programresource/?service_id=test-service');
      }
    });

    api.list(0, 'test-service');
  });

});
