'use strict';

var logger = require('logentries-logformat')('suite-sdk');
var LIMIT = 1000000;
var OFFSET = 0;
var Export = function(request) {
  this._request = request;
};
var x = {};

Export.prototype = {
  segment: function(customerId, options) {
    options = options || {};
    logger.log('export_segment');
    return this._request.post(customerId, '/export/filter', options);
  },

  contactList: function(customerId, options) {
    logger.log('export_contactList');
    return this._request.post(customerId, '/email/getcontacts', options);
  },

  results: function(customerId, exportId, offset, limit) {
    limit = limit || LIMIT;
    offset = offset || OFFSET;
    logger.log('export_results');
    return this._request.get(customerId,
        '/export/' + exportId + '/data/limit=' + limit + '&offset=' + offset);
  },

  status: function(customerId, exportId) {
    logger.log('export_status');
    return this._request.get(customerId, '/export/' + exportId);
  }
};

Export.create = function(request) {
  return new Export(request);
};

module.exports = Export;
