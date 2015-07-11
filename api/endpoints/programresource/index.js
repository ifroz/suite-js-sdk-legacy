'use strict';

var logger = require('logentries-logformat')('suite-sdk');
var Base = require('../_base');

var ProgramResource = function(request, options) {
  Base.call(this, options);
  this._request = request;
};

ProgramResource.prototype = {
  list: function(payload, options) {
    logger.log('programresource_list');
    return this._request.get(this._getCustomerId(options),
        '/programresource/?service_id=' + payload.service_id);
  }
};

ProgramResource.create = function(request, options) {
  return new ProgramResource(request, options);
};

module.exports = ProgramResource;

