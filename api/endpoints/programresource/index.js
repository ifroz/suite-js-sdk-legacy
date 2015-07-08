'use strict';

var logger = require('logentries-logformat')('suite-sdk');

var ProgramResource = function(request) {
  this._request = request;
};

ProgramResource.prototype = {
  list: function(customerId, serviceId) {
    logger.log('programresource_list');
    return this._request.get(customerId, '/programresource/?service_id=' + serviceId);
  }
};

ProgramResource.create = function(request) {
  return new ProgramResource(request);
};

module.exports = ProgramResource;

