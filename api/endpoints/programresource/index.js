'use strict';

var logger = require('logentries-logformat')('suite-sdk');
var Base = require('../_base');

var ProgramResource = function(request, options) {
  Base.call(this, options);
  this._request = request;
};

ProgramResource.prototype = {
  list: function(customerId, serviceId) {
    logger.log('programresource_list');
    return this._request.get(customerId,
        '/programresource/service_id=' + serviceId);
  }

};

ProgramResource.create = function(request, options) {
  return new ProgramResource(request, options);
};

module.exports = ProgramResource;
