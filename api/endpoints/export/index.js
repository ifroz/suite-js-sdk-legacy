'use strict';

var logger = require('logentries-logformat')('suite-sdk');

var Base = require('../_base');
var Export = function(request, options) {
  Base.call(this, options);
  this._request = request;
};

Export.prototype = {
  segment: function(payload, options) {
    options = options || {};
    logger.log('export_segment');
    return this._request.post(this._getCustomerId(options),
        '/export/filter', payload);
  },

  contactList: function(payload, options) {
    logger.log('export_contactList');
    return this._request.post(this._getCustomerId(options),
        '/email/getcontacts', payload);
  },

  results: function(payload, options) {
    logger.log('export_results');
    var url = '/export/' + payload.export_id + '/data';
    return this._request.get(this._getCustomerId(options),
        this._buildUrl(url, payload, ['export_id']));
  },

  status: function(payload, options) {
    logger.log('export_status');
    return this._request.get(this._getCustomerId(options),
        '/export/' + payload.export_id);
  }
};

Export.create = function(request, options) {
  return new Export(request, options);
};

module.exports = Export;
